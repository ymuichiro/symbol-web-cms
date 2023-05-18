module.exports = {
  myJob: {
    task: async ({ strapi }) => {
      const currentUtc = new Date();
      // まだ結果が出ていないpollを取得
      // dateOfEndingが現在時刻よりも前で、resultがnullのもの
      // これは、cronタスクが動いているサーバーの時刻に依存してしまうので、UTCに変換して比較する
      const unresolvedPolls = await strapi.entityService.findMany('api::poll.poll', {
        filters: {
          result: null,
        },
      });
      unresolvedPolls.forEach(async (poll) => {
        const dateOfEnding = new Date(poll.dateOfEnding);
        if (dateOfEnding < currentUtc) {
          poll.options = poll.options.split(',');
          await strapi.controller('api::symbol-poll.symbol-poll').executeOpenPoll(poll);
        }
      });
    },
    options: {
      // 15分ごとに実行
      rule: '*/15 * * * *',
    },
  },
};
