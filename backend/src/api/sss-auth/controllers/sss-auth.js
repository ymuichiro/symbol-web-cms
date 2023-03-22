'use strict';

/**
 * A set of functions called "actions" for `sss-auth`
 */

const symbol = require('symbol-sdk');

module.exports = {
  async setPassword(ctx, next) {
    try {
      const { address, publicKey } = ctx.request.body;
      const nonce = symbol.Crypto.randomBytes(8);
      const password = symbol.Convert.uint8ToHex(nonce);
      const user = await strapi.query('admin::user').findOne({ where: { email: address } });
      if (user == null) throw new Error('Account does not exist');
      await strapi.entityService.update('admin::user', user.id, {
        data: {
          password,
          isActive: true,
          username: address.replace('@mail.com', '').toUpperCase(),
        },
      });
      const networkType = process.env.NETWORKTYPE == '152' ? symbol.NetworkType.TEST_NET : symbol.NetworkType.MAIN_NET;
      const encryptedMessage = symbol.EncryptedMessage.create(
        password,
        symbol.PublicAccount.createFromPublicKey(publicKey, networkType),
        process.env.ADMIN_PRIVATEKEY
      );
      const encryptedPayload = encryptedMessage.payload;
      return [encryptedPayload, process.env.ADMIN_PUBLICKEY];
    } catch (err) {
      ctx.badRequest('Account does not exist', { moreDetails: err });
    }
  },
  async getAdminPublicKey(ctx, next) {
    try {
      return process.env.ADMIN_PUBLICKEY;
    } catch (err) {
      ctx.badRequest('Pubkey does not exist', { moreDetails: err });
    }
  },
};
