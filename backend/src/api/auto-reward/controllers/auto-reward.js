'use strict';
/**
 * A set of functions called "actions" for `auto-reward`
 */

const { HashLockTransaction, AggregateTransactionCosignature, Deadline, RepositoryFactoryHttp, PublicAccount, Account, Address, Mosaic, UInt64, PlainMessage, TransferTransaction, AggregateTransaction } = require('symbol-sdk');
const op = require('rxjs');
const nodeUtil =  require("symbol-node-util");

module.exports = {
  sendReward: async (ctx, next) => {
    try {
      const NODE = await nodeUtil.getActiveNode(Number(process.env.NETWORKTYPE));
      const repositoryFactory = new RepositoryFactoryHttp(NODE);
      const transactionHttp = repositoryFactory.createTransactionRepository();
      const nt = await op.firstValueFrom(repositoryFactory.getNetworkType());
      const ng = await op.firstValueFrom(repositoryFactory.getGenerationHash());
      const ea = await op.firstValueFrom(repositoryFactory.getEpochAdjustment());
      const currency = await op.firstValueFrom(repositoryFactory.getCurrencies());
      const mosaicId = currency.currency.mosaicId;
      const divisibility = currency.currency.divisibility;
      const rawAddress = ctx.query.address;
      const rewardAmount = Number(ctx.query.amount) == 0 ? 0 : Number(ctx.query.amount) * Math.pow(10, divisibility);
      
      const deadline = Deadline.create(ea);
      const sender = PublicAccount.createFromPublicKey(process.env.SENDER_PUBLICKEY, nt);
      const bot = Account.createFromPrivateKey(process.env.BOT_PRIVATEKEY, nt);
      const receiver = Address.createFromRawAddress(rawAddress)

      const tx = TransferTransaction.create(
        deadline,
        receiver,
        [new Mosaic(mosaicId, UInt64.fromUint(rewardAmount))],
        PlainMessage.create("Send Reward"),
        nt
      ).setMaxFee(100)

      const agg = AggregateTransaction.createBonded(
        Deadline.create(ea, 48),
        [tx.toAggregate(sender)],
        nt
      ).setMaxFeeForAggregate(100, 0)

      const signedAggregateTx = bot.sign(agg, ng);
      const hashLockTx = HashLockTransaction.create(
        deadline,
        new Mosaic(mosaicId, UInt64.fromUint(10000000)),
        UInt64.fromUint(480),
        signedAggregateTx,
        nt
      ).setMaxFee(100)

      const signedLockTx = bot.sign(hashLockTx, ng);
      await op.firstValueFrom(transactionHttp.announce(signedLockTx));
      console.log(signedLockTx.hash);

      const listener = repositoryFactory.createListener();

      ctx.body = "signed hashlockTx: " + signedLockTx.hash;
      ctx.response.status = 200;

      listener.open().then(() => {
        console.log('listener open');
        listener.confirmed(bot.address).pipe(
          op.filter(tx => {
            console.log(tx);
            return tx.transactionInfo !== undefined && tx.transactionInfo.hash === signedLockTx.hash;
          }),
          op.delay(5000),
          op.mergeMap(_ => {
            return transactionHttp.announceAggregateBonded(signedAggregateTx);
          })
        ).subscribe(
          (x) => {
            console.log("tx Ok!!!", x);
            listener.close();
          },
          (err) => {
            console.error(err)
            listener.close();
          });
      });
    } catch (err) {
      console.error(err)
      ctx.body = err;
    }
  },
  createAggregateTransaction: async (ctx, next) => {
    try {
      const NODE = await nodeUtil.getActiveNode(Number(process.env.NETWORKTYPE));
      const repositoryFactory = new RepositoryFactoryHttp(NODE);
      const nt = await op.firstValueFrom(repositoryFactory.getNetworkType());
      const ea = await op.firstValueFrom(repositoryFactory.getEpochAdjustment());
      const ng = await op.firstValueFrom(repositoryFactory.getGenerationHash());
      const currency = await op.firstValueFrom(repositoryFactory.getCurrencies());
      const mosaicId = currency.currency.mosaicId;
      const divisibility = currency.currency.divisibility;
      const rawAddress = ctx.query.address;
      const rewardAmount = Number(ctx.query.amount) == 0 ? 0 : Number(ctx.query.amount) * Math.pow(10, divisibility);
      const receiver = Address.createFromRawAddress(rawAddress)
      const sender = PublicAccount.createFromPublicKey(process.env.SENDER_PUBLICKEY, nt);
      
      const deadline = Deadline.create(ea);
      const tx = TransferTransaction.create(
        deadline,
        receiver,
        [new Mosaic(mosaicId, UInt64.fromUint(rewardAmount))],
        PlainMessage.create("Send Reward"),
        nt
      ).setMaxFee(100)

      const bot = Account.createFromPrivateKey(process.env.BOT_PRIVATEKEY, nt);
      const agg = AggregateTransaction.createBonded(
        Deadline.create(ea, 48),
        [tx.toAggregate(sender)],
        nt
      ).setMaxFeeForAggregate(100, 1)
      const signed = bot.sign(agg, ng)
      return [signed.payload, agg.serialize(), NODE]
    } catch (err) {
      console.error(err)
      ctx.body = err;
    }
  },
  announceTransaction: async (ctx, next) => {
    try {
      const NODE = ctx.query.node;
      const repositoryFactory = new RepositoryFactoryHttp(NODE);
      const transactionHttp = repositoryFactory.createTransactionRepository();
      const multisigHttp = repositoryFactory.createMultisigRepository();
      const nt = await op.firstValueFrom(repositoryFactory.getNetworkType());
      const ea = await op.firstValueFrom(repositoryFactory.getEpochAdjustment());
      const ng = await op.firstValueFrom(repositoryFactory.getGenerationHash());
      const currency = await op.firstValueFrom(repositoryFactory.getCurrencies());
      const mosaicId = currency.currency.mosaicId;

      const bot = Account.createFromPrivateKey(process.env.BOT_PRIVATEKEY, nt);
      
      const deadline = Deadline.create(ea);
      const aggTx = AggregateTransaction.createFromPayload(ctx.query.aggPayload)
      const signer = PublicAccount.createFromPublicKey(ctx.query.signerPublicKey, nt);

      const sender = PublicAccount.createFromPublicKey(process.env.SENDER_PUBLICKEY, nt);
      const multisigInfo = await op.firstValueFrom(multisigHttp.getMultisigAccountInfo(sender.address));

      let isCosignature = false;
      for(let i = 0; i < multisigInfo.cosignatoryAddresses.length; i++) {
        if(multisigInfo.cosignatoryAddresses[i].plain() == signer.address.plain()) isCosignature = true;
      }
      if(!isCosignature) throw new Error('signer is not cosignature');

      const aggregateTransactionCosignature = new AggregateTransactionCosignature(ctx.query.signature, signer);
      aggTx.cosignatures.push(aggregateTransactionCosignature);

      const sigendAggregateTx = bot.sign(aggTx, ng)
      console.log('sigendAggregateTx.payload です。もし、10XYMが没収されそうな時はこのハッシュでアナウンスしてください。')
      console.log(sigendAggregateTx.payload)

      const hashLockTx = HashLockTransaction.create(
        deadline,
        new Mosaic(mosaicId, UInt64.fromUint(10000000)),
        UInt64.fromUint(5760),
        sigendAggregateTx,
        nt
      ).setMaxFee(100)

      const signedHashockTx = bot.sign(hashLockTx, ng);
      await op.firstValueFrom(transactionHttp.announce(signedHashockTx));
    
      const listener = repositoryFactory.createListener();
      listener.open().then(() => {
        console.log('listener open');
        listener.confirmed(bot.address)
        .subscribe(async (tx) => {
          setTimeout(async ()=>{
            if(tx.transactionInfo !== undefined && tx.transactionInfo.hash === signedHashockTx.hash) {
              const result = await op.firstValueFrom(transactionHttp.announceAggregateBonded(sigendAggregateTx))
              console.log(result)
            }
          }, 5000)
        })
      });
      ctx.response.status = 200;
    } catch (err) {
      console.error(err)
      ctx.body = err;
    }
  }
};
