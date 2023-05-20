import { firstValueFrom } from 'rxjs';
import { requestSign, setTransaction, getActivePublicKey } from 'sss-module';
import { QRCodeGenerator, TransactionQR } from 'symbol-qr-library';
import { RepositoryFactoryHttp } from 'symbol-sdk/dist/src/infrastructure/RepositoryFactoryHttp';
import { UInt64 } from 'symbol-sdk/dist/src/model/UInt64';
import { Address } from 'symbol-sdk/dist/src/model/account';
import { PlainMessage } from 'symbol-sdk/dist/src/model/message/PlainMessage';
import { Mosaic, MosaicId } from 'symbol-sdk/dist/src/model/mosaic';
import { NetworkType } from 'symbol-sdk/dist/src/model/network';
import { Deadline, SignedTransaction, TransferTransaction, Transaction } from 'symbol-sdk/dist/src/model/transaction';
import { TransactionMapping } from 'symbol-sdk/dist/src/core/utils';
import { Convert } from 'symbol-sdk/dist/src/core/format';

interface Network {
  networkType: NetworkType;
  epochAdjustment: number;
  generationHashSeed: string;
  nemesisSignerPublicKey: string;
  currencyMosaicId: string;
}

export class SymbolService {
  public network: Network = {
    networkType: NetworkType.MAIN_NET,
    epochAdjustment: 0,
    generationHashSeed: '',
    nemesisSignerPublicKey: '',
    currencyMosaicId: '',
  };
  public repo: RepositoryFactoryHttp;

  constructor() {
    this.repo = new RepositoryFactoryHttp(process.env.NEXT_PUBLIC_SYMBOL_NODE!);
  }

  public async init() {
    const networkRepo = this.repo.createNetworkRepository();
    const networkProperties = await firstValueFrom(networkRepo.getNetworkProperties());

    if (
      networkProperties.network.epochAdjustment === undefined ||
      networkProperties.network.generationHashSeed === undefined ||
      networkProperties.network.nemesisSignerPublicKey === undefined ||
      networkProperties.chain.currencyMosaicId === undefined
    )
      throw new Error('Some network properties are undefined');

    this.network = {
      networkType: networkProperties.network.identifier === 'mainnet' ? NetworkType.MAIN_NET : NetworkType.TEST_NET,
      epochAdjustment: parseInt(networkProperties.network.epochAdjustment.replace('s', ''), 10),
      generationHashSeed: networkProperties.network.generationHashSeed,
      nemesisSignerPublicKey: networkProperties.network.nemesisSignerPublicKey,
      currencyMosaicId: networkProperties.chain.currencyMosaicId.replace(/0x|'/g, ''),
    };
  }

  public async createPollTransaction(message: string): Promise<string> {
    const deadline = Deadline.create(this.network.epochAdjustment);
    const nemesisAddress = Address.createFromPublicKey(this.network.nemesisSignerPublicKey, this.network.networkType);
    const transferTransaction = TransferTransaction.create(
      deadline,
      nemesisAddress,
      [],
      PlainMessage.create(message),
      this.network.networkType
    ).setMaxFee(100);

    setTransaction(transferTransaction);
    const signedTransaction = await requestSign();
    await this.announce(signedTransaction);
    return signedTransaction.hash;
  }

  public async announceTransactionFromAlice(payload: string): Promise<string> {
    const hash = Transaction.createTransactionHash(payload, [
      ...Array.from(Convert.hexToUint8(this.network.generationHashSeed)),
    ]);
    const signed = TransactionMapping.createFromPayload(payload);
    const signedTransaction = new SignedTransaction(payload, hash, signed.signer?.publicKey!, signed.type, signed.type);
    await this.announce(signedTransaction);
    return signedTransaction.hash;
  }

  public async announce(signedTransaction: SignedTransaction) {
    try {
      const transactionRepo = this.repo.createTransactionRepository();
      const result = await firstValueFrom(transactionRepo.announce(signedTransaction));
      console.log(result);
    } catch (error: any) {
      throw new Error('Cannot announce: ' + error.message);
    }
  }

  public async getCurrentHeight(): Promise<number> {
    const chainRepo = this.repo.createChainRepository();
    const chainInfo = await firstValueFrom(chainRepo.getChainInfo());
    return chainInfo.height.compact();
  }

  public async voteTransaction(
    title: string,
    hash: string,
    option: string,
    type: VoteType,
    specificMosaicId: string,
    specificMosaicAmount: number
  ): Promise<string> {
    const deadline = Deadline.create(this.network.epochAdjustment);
    const nemesisAddress = Address.createFromPublicKey(this.network.nemesisSignerPublicKey, this.network.networkType);
    const vote: Vote = {
      title,
      hash,
      option,
    };
    const message = JSON.stringify({
      data: vote,
    });

    // TODO: add mosaic
    let mosaic =
      specificMosaicId == '' ? [] : [new Mosaic(new MosaicId(specificMosaicId), UInt64.fromUint(specificMosaicAmount))];
    const transferTransaction = TransferTransaction.create(
      deadline,
      nemesisAddress,
      mosaic,
      PlainMessage.create(message),
      this.network.networkType
    ).setMaxFee(100);

    if (type === VoteType.SSS) {
      try {
        console.log(transferTransaction);
        setTransaction(transferTransaction);
        const signedTransaction = await requestSign();
        await this.announce(signedTransaction);
        return 'success: ' + signedTransaction.hash;
      } catch (error: any) {
        throw new Error(error.message);
      }
    } else if (type === VoteType.QR) {
      try {
        const qrCode: TransactionQR = QRCodeGenerator.createTransactionRequest(
          transferTransaction,
          this.network.networkType,
          this.network.generationHashSeed
        );
        return await firstValueFrom(qrCode.toBase64());
      } catch (error: any) {
        throw new Error(error.message);
      }
    } else if (type === VoteType.URI) {
      return 'web+symbol://transaction?data=' + transferTransaction.serialize();
    } else if (type === VoteType.ALICE) {
      const callback = `${process.env.NEXT_PUBLIC_HOSTING_URL}/symbol-poll/poll?&hash=${hash}&option=${option}`;
      const url = `alice://sign?data=${transferTransaction.serialize()}&type=request_sign_transaction&callback=${Convert.utf8ToHex(
        callback
      )}`;
      window.location.href = url;
      return 'success';
    }
    throw new Error('Invalid vote type');
  }

  public async getMosaics(): Promise<string[]> {
    const accRepo = this.repo.createAccountRepository();
    const accInfo = await firstValueFrom(
      accRepo.getAccountInfo(Address.createFromPublicKey(getActivePublicKey(), this.network.networkType))
    );
    let mosaics: string[] = [];
    accInfo.mosaics.map((mosaic) => {
      mosaics.push(mosaic.id.toHex());
    });
    return mosaics;
  }

  public async hasMosaic(mosaicId: string): Promise<boolean> {
    const mosaics = await this.getMosaics();
    mosaics.forEach((mosaic) => {
      if (mosaic === mosaicId) return true;
    });
    return false;
  }

  static uint64toNumber(uint64: number[]): number {
    return new UInt64(uint64).compact();
  }
}

export enum VoteType {
  SSS,
  QR,
  URI,
  ALICE,
}

interface Vote {
  hash: string;
  title: string;
  option: string;
}
