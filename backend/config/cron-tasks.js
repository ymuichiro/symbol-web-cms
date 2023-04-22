module.exports = {
  myJob: {
    task: async ({ strapi }) => {
      const currentUtcTime = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000);
      // まだ結果が出ていないpollを取得
      // openPollDateが現在時刻よりも前で、resultがnullのもの
      // これは、cronタスクが動いているサーバーの時刻に依存してしまうので、UTCに変換して比較する
      const unresolvedPolls = await strapi.entityService.findMany('api::poll.poll', {
        filters: {
          $and: [
            {
              openPollDate: {
                $lt: currentUtcTime,
              },
            },
            {
              result: null,
            },
          ],
        },
      });
      unresolvedPolls.forEach(async (poll) => {
        poll.options = poll.options.split(',');
        await strapi.controller('api::symbol-poll.symbol-poll').executeOpenPoll(poll);
      });
    },
    options: {
      // 15分ごとに実行
      rule: '*/15 * * * *',
    },
  },
};
