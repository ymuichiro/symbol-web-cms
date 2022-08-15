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
    {
      method: 'GET',
      path: '/create-aggregate-transaction',
      handler: 'auto-reward.createAggregateTransaction',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/create-hashlock-transaction',
      handler: 'auto-reward.createHashLockTransaction',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/announce-transaction',
      handler: 'auto-reward.announceTransaction',
      config: { auth: false },
    },
  ],
};
