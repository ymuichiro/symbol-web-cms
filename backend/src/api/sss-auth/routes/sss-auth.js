module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/set-password',
      handler: 'sss-auth.setPassword',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/admin-pubkey',
      handler: 'sss-auth.getAdminPublicKey',
      config: { auth: false },
    },
  ],
};
