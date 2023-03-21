'use strict';

const symbol = require('symbol-sdk');
const { firstValueFrom } = require('rxjs');

const repo = new symbol.RepositoryFactoryHttp(process.env.SYMBOL_NODE);

module.exports = {
  async setOpenPoll(ctx, next) {
    try {
      const { id, hash, startHeight, options, time } = ctx.request.body;
      console.log(time)
      setTimeout(async () => {
        const result = await getResultPolls(hash, startHeight, options);
        console.log(result)
        const update = await strapi.entityService.update(
          'api::poll.poll', id, {
            data: {
              result
            },
          }
        );
      }, time);
      ctx.response.body = 'Job scheduled';
    } catch (err) {
      ctx.badRequest("Account does not exist", { moreDetails: err });
    }
  }
};

async function getNetWorkPropeties(){
  const networkRepo = repo.createNetworkRepository();
  const n = await firstValueFrom(networkRepo.getNetworkProperties());
  return {
    identifier: n.network.identifier,
    epochAdjustment: n.network.epochAdjustment,
    generationHashSeed: n.network.generationHashSeed,
    nemesisSignerPublicKey: n.network.nemesisSignerPublicKey
  }
}

async function getResultPolls(hash, startHeight, options) {
  const {identifier, epochAdjustment, generationHashSeed, nemesisSignerPublicKey} = await getNetWorkPropeties();
  const networkType = identifier == "mainnet" ? symbol.NetworkType.MAIN_NET : symbol.NetworkType.TEST_NET;
  const txRepo = repo.createTransactionRepository();
  const accRepo = repo.createAccountRepository();
  let isFinished = false;
  let count = 1;
  const votes = [];
  while(!isFinished){
      const criteria = {
          group: symbol.TransactionGroup.Confirmed,
          fromHeight: symbol.UInt64.fromUint(startHeight),
          recipientAddress: symbol.Address.createFromPublicKey(nemesisSignerPublicKey, networkType),
          pageNumber: count,
          order: symbol.Order.Asc
      }
      const txs = await firstValueFrom(txRepo.search(criteria));
      count++;
      if(txs.data.length == 0) isFinished = true;
      for(let i = 0; i < txs.data.length; i++){
          if(txs.data[i].type != symbol.TransactionType.TRANSFER) continue;
          try {
              const d = JSON.parse(txs.data[i].message.payload);
              const vote = d.data;
              if(vote.hash != hash) continue;
              const signer = txs.data[i].signer;
              if(signer == undefined) continue;
              const address = symbol.Address.createFromPublicKey(signer.publicKey, networkType);
              const accInfo = await firstValueFrom(accRepo.getAccountInfo(address));
              const voteData = {
                  publicKey: signer.publicKey,
                  vote,
                  importance: accInfo.importance
              }
              votes.push(voteData);
          } catch {
              continue;
          }
      }
  };
  const uniqueVotes = votes.reduceRight((acc, vote) => {
    if (!acc.some(v => v.publicKey === vote.publicKey)) {
        acc.push(vote);
    }
    return acc;
  }, []).reverse();

  const filteredVotes = getVotesByOption(uniqueVotes, options);
  let result = [];
  for(let j = 0; j < options.length; j++){
      let resultVote = {
          option: options[j],
          totalImpotance: symbol.UInt64.fromUint(0),
          count: 0
      };
      for(let l = 0; l < filteredVotes[options[j]].length; l++) {
          resultVote.totalImpotance = resultVote.totalImpotance.add(filteredVotes[options[j]][l].importance);
          resultVote.count++;
      }
      result.push(resultVote)
  }
  return result;
}

function getVotesByOption(votes, options) {
  const votesByOption = {};

  options.forEach(option => {
      votesByOption[option] = votes.filter(vote => vote.vote.option === option);
  });

  return votesByOption;
}
