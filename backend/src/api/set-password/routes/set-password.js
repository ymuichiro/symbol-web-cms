module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/set-password',
      handler: 'set-password.setPassword',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
