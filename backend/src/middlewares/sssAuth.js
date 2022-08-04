const symbol = require('symbol-sdk');

module.exports = (config, { strapi }) => {
    // Add your own logic here.
    return async (ctx, next) => {
      if(ctx.req.url == '/admin/login') {
        strapi.log.info("In Auth middleware.");
        const {address, publicKey, email, sssToken} = ctx.request.body;
        const networkType = symbol.NetworkType.TEST_NET;
        const privateKey = '5E73378E058339952B13D65297C294884C03C83DECDAB2B9B3E33AFC8F89AA22';
        const accountHttp = new symbol.AccountHttp('https://hideyoshi.mydns.jp:3001');
        const add = symbol.Address.createFromRawAddress(address)
        const accInfo = await accountHttp.getAccountInfo(add).toPromise();
        //const pub = symbol.PublicAccount.createFromPublicKey(accInfo.publicAccount, networkType)
        const encryptedMessage = new symbol.EncryptedMessage(sssToken)
        try {
            const payload = symbol.EncryptedMessage.decrypt(encryptedMessage, privateKey, accInfo.publicAccount).payload;
            const decrypto = JSON.parse(payload);
            console.log(decrypto)
            console.log(address)
            if(decrypto.signerAddress == address){
                await next();
            }
        } catch(e) {
            ctx.res.status = 403
            console.error('error' + e)
        }
      } else {
        await next();
      }
    };
  };
