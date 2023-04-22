module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.req.url == '/api/polls') {
      const input = ctx.request.body;
      console.log(input);
      const existingPoll = await strapi.db.query('api::poll.poll').findOne({
        where: { hash: input.data.hash },
      });
      if (existingPoll) {
        return ctx.badRequest(`Poll with hash '${input.hash}' already exists.`);
      }
      await next();
    } else {
      await next();
    }
  };
};
