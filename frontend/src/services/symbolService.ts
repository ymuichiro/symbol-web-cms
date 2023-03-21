import {NetworkType, Deadline, Address, TransferTransaction, MosaicId, Mosaic, UInt64, PlainMessage, SignedTransaction, RepositoryFactoryHttp} from 'symbol-sdk';
import { firstValueFrom } from 'rxjs';
import { QRCodeGenerator, TransactionQR } from 'symbol-qr-library';
import { requestSign, setTransaction} from 'sss-module';

interface Network{
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
        generationHashSeed: "",
        nemesisSignerPublicKey: "",
        currencyMosaicId: ""
    };
    public repo: RepositoryFactoryHttp;
    constructor(){
        this.repo = new RepositoryFactoryHttp(process.env.NEXT_PUBLIC_SYMBOL_NODE!);
    }

    public async init(){
        const networkRepo = this.repo.createNetworkRepository();
        const n = await firstValueFrom(networkRepo.getNetworkProperties());
        
        if(n.network.epochAdjustment == undefined || n.network.generationHashSeed == undefined || n.network.nemesisSignerPublicKey == undefined || n.chain.currencyMosaicId == undefined) throw new Error('some network propaties are undefind');
        this.network = {
            networkType: n.network.identifier == "mainnet" ? NetworkType.MAIN_NET : NetworkType.TEST_NET,
            epochAdjustment: parseInt(n.network.epochAdjustment.replace("s", ""), 10),
            generationHashSeed: n.network.generationHashSeed,
            nemesisSignerPublicKey: n.network.nemesisSignerPublicKey,
            currencyMosaicId: n.chain.currencyMosaicId.replace(/0x|'/g, ""),
        }
    }

    public async createPollTransaction(message: string): Promise<string>{
        const deadline = Deadline.create(this.network.epochAdjustment);
        const nemesisAddress = Address.createFromPublicKey(this.network.nemesisSignerPublicKey, this.network.networkType);
        console.log(this.network.currencyMosaicId)
        const tx = TransferTransaction.create(
            deadline,
            nemesisAddress,
            [new Mosaic(new MosaicId(this.network.currencyMosaicId), UInt64.fromUint(0))],
            PlainMessage.create(message),
            this.network.networkType
        ).setMaxFee(100)
        console.log(tx)
        setTransaction(tx);
        const signedTransaction = await requestSign();
        await this.announce(signedTransaction);
        return signedTransaction.hash
    }

    public async announce(signedTransaction: SignedTransaction){
        try{
            const txRepo = this.repo.createTransactionRepository();
            const result = await firstValueFrom(txRepo.announce(signedTransaction));
            console.log(result);
        } catch (e: any) {
            throw new Error('can not announce: ' + e.message);
        }
    }

    public async getCurrentHeight(): Promise<number>{
        const blockRepo = this.repo.createChainRepository();
        const chainInfo = await firstValueFrom(blockRepo.getChainInfo());
        return chainInfo.height.compact();
    }

    public async voteTransaction(title: string, hash: string, option: string, type: VoteType): Promise<string>{
        const deadline = Deadline.create(this.network.epochAdjustment);
        const nemesisAddress = Address.createFromPublicKey(this.network.nemesisSignerPublicKey, this.network.networkType);
        const vote: Vote = {
            title,
            hash,
            option
        }
        const message = JSON.stringify({
            data: vote
        })
        const tx = TransferTransaction.create(
            deadline,
            nemesisAddress,
            [new Mosaic(new MosaicId(this.network.currencyMosaicId), UInt64.fromUint(0))],
            PlainMessage.create(message),
            this.network.networkType
        ).setMaxFee(100)

        if(type == VoteType.SSS){
            try {
                console.log(tx);
                setTransaction(tx);
                const signedTransaction = await requestSign();
                await this.announce(signedTransaction);
                return 'success: ' + signedTransaction.hash;
            } catch(e: any) {
                throw new Error(e.message);
            }
        } else if (VoteType.QR){
            try {
                const qrCode: TransactionQR = QRCodeGenerator.createTransactionRequest(tx, this.network.networkType, this.network.generationHashSeed);
                return await firstValueFrom(qrCode.toBase64());
            } catch(e: any) {
                throw new Error(e.message);
            }
        }
        throw new Error('invalid vote type');
    }
}

export enum VoteType{
    SSS,
    QR
}

interface Vote {
    hash: string,
    title: string,
    option: string,
}

interface VoteData {
    publicKey: string,
    vote: Vote,
    importance: UInt64
}

interface VotesGroups {
    [option: string]: VoteData[];
}

interface ResutlVote {
    totalImpotance: UInt64,
    count: number
}
