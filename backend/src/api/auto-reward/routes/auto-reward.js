module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/auto-reward',
      handler: 'auto-reward.sendReward',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
