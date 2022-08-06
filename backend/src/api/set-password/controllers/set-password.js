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
      return data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
