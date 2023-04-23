module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/execute-open-poll',
      handler: 'symbol-poll.executeOpenPoll',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/set-open-poll',
      handler: 'symbol-poll.setOpenPoll',
      config: { auth: false },
    },
  ],
};
