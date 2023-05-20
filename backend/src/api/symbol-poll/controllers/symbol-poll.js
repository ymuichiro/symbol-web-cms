'use strict';

const symbol = require('symbol-sdk');
const { firstValueFrom } = require('rxjs');

const repo = new symbol.RepositoryFactoryHttp(process.env.SYMBOL_NODE);

async function getNetworkProperties() {
  const networkRepo = repo.createNetworkRepository();
  const n = await firstValueFrom(networkRepo.getNetworkProperties());
  return {
    identifier: n.network.identifier,
    epochAdjustment: n.network.epochAdjustment,
    generationHashSeed: n.network.generationHashSeed,
    nemesisSignerPublicKey: n.network.nemesisSignerPublicKey,
  };
}

async function getResultPolls(hash, startHeight, options, specificMosaicId) {
  const { identifier, epochAdjustment, generationHashSeed, nemesisSignerPublicKey } = await getNetworkProperties();
  const networkType = identifier == 'mainnet' ? symbol.NetworkType.MAIN_NET : symbol.NetworkType.TEST_NET;
  const txRepo = repo.createTransactionRepository();
  const accRepo = repo.createAccountRepository();

  let count = 1;
  const votes = [];
  while (true) {
    const criteria = {
      group: symbol.TransactionGroup.Confirmed,
      fromHeight: symbol.UInt64.fromUint(startHeight),
      type: [symbol.TransactionType.TRANSFER],
      recipientAddress: symbol.Address.createFromPublicKey(nemesisSignerPublicKey, networkType),
      pageNumber: count,
      order: symbol.Order.Asc,
    };
    const txs = await firstValueFrom(txRepo.search(criteria));
    count++;

    // ここで、txs.data.lengthが0の場合は、もうトランザクションがないので、ループを抜ける
    if (txs.data.length == 0) break;

    if (specificMosaicId != null) {
      for (let i = 0; i < txs.data.length; i++) {
        try {
          // ここで、指定されたモザイクの量を取得する
          const amount = txs.data[i].mosaics.find((tx) => tx.id.toHex() == specificMosaicId).amount;
          // ここで、指定されたモザイクの量がない場合は、continueする
          if (amount == undefined) continue;
          culcVote(txs.data[i], amount);
        } catch {
          continue;
        }
      }
    } else {
      for (let i = 0; i < txs.data.length; i++) {
        try {
          const address = symbol.Address.createFromPublicKey(txs.data[i].signer.publicKey, networkType);
          const accInfo = await firstValueFrom(accRepo.getAccountInfo(address));
          culcVote(txs.data[i], accInfo.importance);
        } catch {
          continue;
        }
      }
    }
  }

  // ここで、voteの中身を集計する
  function culcVote(data, numUInt64) {
    const d = JSON.parse(data.message.payload);
    if (d.data == undefined) return;
    const vote = d.data;
    const signer = data.signer;
    if (vote.hash != hash) return;
    if (signer == undefined) return;

    const voteData = {
      publicKey: signer.publicKey,
      vote,
      amount: numUInt64,
    };
    // ここで、votesにvoteDataをpushする
    votes.push(voteData);
  }

  const uniqueVotes = votes
    .reduceRight((acc, vote) => {
      if (!acc.some((v) => v.publicKey === vote.publicKey)) {
        acc.push(vote);
      }
      return acc;
    }, [])
    .reverse();

  // インポータンス投票の場合は、最後の投票のみを集計する
  // オプション毎の投票数を集計する
  const filteredVotes = getVotesByOption(specificMosaicId == null ? uniqueVotes : votes, options);

  let result = [];
  for (let j = 0; j < options.length; j++) {
    let resultVote = {
      option: options[j],
      totalAmount: symbol.UInt64.fromUint(0),
      count: 0,
    };
    for (let l = 0; l < filteredVotes[options[j]].length; l++) {
      resultVote.totalAmount = resultVote.totalAmount.add(filteredVotes[options[j]][l].amount);
      resultVote.count++;
    }
    result.push(resultVote);
  }
  return result;
}

function getVotesByOption(votes, options) {
  const votesByOption = {};

  options.forEach((option) => {
    votesByOption[option] = votes.filter((vote) => vote.vote.option === option);
  });

  return votesByOption;
}

module.exports = {
  async executeOpenPoll(poll) {
    try {
      const { id, hash, startHeight, options, specificMosaicId } = poll;
      const result = await getResultPolls(hash, startHeight, options, specificMosaicId);
      console.log(result);
      const update = await strapi.entityService.update('api::poll.poll', id, {
        data: {
          result,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async setOpenPoll(ctx, next) {
    try {
      const { id, hash, startHeight, options, time, specificMosaicId } = ctx.request.body;
      console.log(time);
      setTimeout(async () => {
        const result = await getResultPolls(hash, startHeight, options, specificMosaicId);
        console.log(result);
        const update = await strapi.entityService.update('api::poll.poll', id, {
          data: {
            result,
          },
        });
      }, time);
      ctx.response.body = 'Job scheduled';
    } catch (err) {
      ctx.badRequest('Account does not exist', { moreDetails: err });
    }
  },
};
