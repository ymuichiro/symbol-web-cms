'use strict';
/**
 * A set of functions called "actions" for `auto-reward`
 */

const { HashLockTransaction, Deadline, RepositoryFactoryHttp, PublicAccount, Account, Address, MosaicId, Mosaic, UInt64, PlainMessage, NetworkType, TransferTransaction, AggregateTransaction } = require('symbol-sdk');
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
      const currency = await repositoryFactory.getCurrencies().toPromise();
      const mosaicId = currency.currency.mosaicId;

      const rawAddress = ctx.query.address;
      const rewardAmount = Number(ctx.query.amount);
      const deadline = Deadline.create(ea);
      const sender = PublicAccount.createFromPublicKey(process.env.SENDER_PUBLICKEY, nt);
      const bot = Account.createFromPrivateKey(process.env.BOT_PRIVATEKEY, nt);
      const receiver = Address.createFromRawAddress(rawAddress)

      const tx = TransferTransaction.create(
        deadline,
        receiver,
        [new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(rewardAmount))],
        PlainMessage.create("Send Reward"),
        nt
      ).setMaxFee(100)

      const agg = AggregateTransaction.createBonded(
        Deadline.create(ea, 48, JSJoda.ChronoUnit.HOURS),
        [tx.toAggregate(sender)],
        nt
      ).setMaxFeeForAggregate(100, 0)

      const signedAggregateTx = bot.sign(agg, ng);
      const hashLockTx = HashLockTransaction.create(
        deadline,
        new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(10000000)),
        UInt64.fromUint(480),
        signedAggregateTx,
        nt
      ).setMaxFee(100)

      const signedLockTx = bot.sign(hashLockTx, ng);
      const result = await op.firstValueFrom(transactionHttp.announce(signedLockTx));
      console.log(result);

      const listener = repositoryFactory.createListener();

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
      ctx.body = "send reward";
    } catch (err) {
      console.error(err)
      ctx.body = err;
    }
  }
};
