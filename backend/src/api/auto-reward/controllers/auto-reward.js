'use strict';
/**
 * A set of functions called "actions" for `auto-reward`
 */

const { HashLockTransaction, Deadline, RepositoryFactoryHttp, PublicAccount, Account, Address, MosaicId, Mosaic, UInt64, PlainMessage, NetworkType, TransferTransaction, AggregateTransaction } = require('symbol-sdk');
const op = require('rxjs');

const NODE = "https://hideyoshi-node.net:3001";
const repositoryFactory = new RepositoryFactoryHttp(NODE);
const transactionHttp = repositoryFactory.createTransactionRepository();
const mosaicId = '6BED913FA20223F8';
var ea = 1615853185;
var nt = NetworkType.MAIN_NET;
const ng = "57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6";

module.exports = {
  sendReward: async (ctx, next) => {
    try {
      const rawAddress = ctx.query.address;
      const rewardAmount = Number(ctx.query.amount);
      const deadline = Deadline.create(ea);
      const sender = PublicAccount.createFromPublicKey("9C2E2EAF09A681E7B8186EBBEDCC426CB054635C758353F710ABFAB477919C61", nt);
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
      ctx.body = "send reward";
    } catch (err) {
      console.error(err)
      ctx.body = err;
    }
  }
};
