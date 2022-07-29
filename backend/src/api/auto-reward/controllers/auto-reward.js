'use strict';
/**
 * A set of functions called "actions" for `auto-reward`
 */

const { HashLockTransaction, Deadline, RepositoryFactoryHttp, PublicAccount, Account, Address, MosaicId, Mosaic, UInt64, PlainMessage, NetworkType, TransferTransaction, AggregateTransaction } = require('symbol-sdk');
const op = require('rxjs');

const NODE = "https://hideyoshi.mydns.jp:3001";
const repositoryFactory = new RepositoryFactoryHttp(NODE);
const transactionHttp = repositoryFactory.createTransactionRepository();
const mosaicId = '3A8416DB2D53B6C8';
var ea = 1637848847;
var nt = NetworkType.TEST_NET;
const ng = "7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836";

module.exports = {
  sendReward: async (ctx, next) => {
    try {
      const rawAddress = ctx.query.address;
      const rewardAmount = Number(ctx.query.amount);
      const deadline = Deadline.create(ea);
      const sender = PublicAccount.createFromPublicKey("71754759FD4F25981ED20F60050C20AB1E7CA104A87EC758E9B1E69FCA0286D6", nt);
      const bot = Account.createFromPrivateKey("319F6A56F321AC3D8FFBFD517B785C4886994A53ED2B18930F7E019E068DB2CF", nt);
      const receiver = Address.createFromRawAddress(rawAddress)

      const tx = TransferTransaction.create(
        deadline,
        receiver,
        [new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(rewardAmount))],
        PlainMessage.create("Send Reward"),
        nt
      ).setMaxFee(100)

      const agg = AggregateTransaction.createBonded(
        deadline,
        [tx.toAggregate(sender)],
        nt
      ).setMaxFeeForAggregate(100, 2)

      const signedAggregateTx = bot.sign(agg, ng);
      const hashLockTx = HashLockTransaction.create(
        deadline,
        new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(10000000)),
        UInt64.fromUint(480),
        signedAggregateTx,
        nt
      ).setMaxFee(100)

      const signedLockTx = bot.sign(hashLockTx, ng);
      transactionHttp.announce(signedLockTx).subscribe((x) => {
        console.log(x)
      }, (err) => console.error(err));

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
    } catch (err) {
      ctx.body = err;
    }
  }
};
