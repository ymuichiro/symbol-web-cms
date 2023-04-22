const symbol = require('symbol-sdk');

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.req.url == '/admin/login') {
      const { publicKey, sssToken } = ctx.request.body;
      const networkType = process.env.NETWORKTYPE == '152' ? symbol.NetworkType.TEST_NET : symbol.NetworkType.MAIN_NET;
      const privateKey = process.env.ADMIN_PRIVATEKEY;
      const publickAccount = symbol.PublicAccount.createFromPublicKey(publicKey, networkType);
      const encryptedMessage = new symbol.EncryptedMessage(sssToken);
      const payload = symbol.EncryptedMessage.decrypt(encryptedMessage, privateKey, publickAccount).payload;
      const decrypto = JSON.parse(payload);
      ctx.request.body.password = decrypto.encryptedMessage;
      await next();
    } else {
      await next();
    }
  };
};
