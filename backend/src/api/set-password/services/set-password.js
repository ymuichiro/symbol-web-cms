'use strict';

/**
 * set-password service.
 */
 const symbol = require('symbol-sdk');

 module.exports = {
    setPassword: async (ctx) => {
      try {
        const {address, publicKey} = ctx.request.body;
        console.log(address, publicKey)
        const nonce = symbol.Crypto.randomBytes(8);
        const password = symbol.Convert.uint8ToHex(nonce);
        const user = await strapi.query('admin::user').findOne({ where: { email: address }});
        console.log(user)
        await strapi.entityService.update('admin::user', user.id, {
            data: {
              password
            },
        });
        const encryptedMessage = symbol.EncryptedMessage.create(password, symbol.PublicAccount.createFromPublicKey(publicKey, symbol.NetworkType.TEST_NET), '5E73378E058339952B13D65297C294884C03C83DECDAB2B9B3E33AFC8F89AA22')
        const encryptedPayload = encryptedMessage.payload;
        return encryptedPayload;
      } catch (err) {
        return err;
      }
    },
  };