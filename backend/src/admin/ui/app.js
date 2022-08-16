import MenuLogo from './extensions/logo-one.png';
import AuthLogo from './extensions/logo.png';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    locales: ['ja', 'en'],
    auth: {
      logo: AuthLogo,
    },
    menu: {
      logo: MenuLogo,
    },
    head: {
      favicon: favicon,
    },
    bot: {
      id: process.env.BOT_ID,
    },
  },

  bootstrap(app) {
    console.log(app);
  },
};
