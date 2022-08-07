'use strict';

/**
 * A set of functions called "actions" for `set-password`
 */

 module.exports = {
  async setPassword(ctx, next) {
    try {
      const data = await strapi
        .service("api::set-password.set-password")
        .setPassword(ctx);
        if(!data[0]) throw new Error(data[1])
      return data;
    } catch (err) {
      ctx.badRequest("Account does not exist", { moreDetails: err });
    }
  },
};
