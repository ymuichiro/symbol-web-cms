module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/set-open-poll',
      handler: 'symbol-poll.setOpenPoll',
      config: { auth: false },
    }
  ],
};
