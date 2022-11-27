import MenuLogo from './extensions/logo-one.png';
import AuthLogo from './extensions/logo.png';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    locales: ['ja-JP', 'en'],
    auth: { logo: AuthLogo },
    menu: { logo: MenuLogo },
    head: { favicon: favicon },
    tutorials: false,
    notifications: { release: false },
    theme: {
      colors: {
        color: {
          alternative100: '#181826',
          alternative200: '#4a4a6a',
          alternative500: '#ac73e6',
          alternative600: '#ac73e6',
          alternative700: '#e0c1f4',
          buttonNeutral0: '#ffffff',
          buttonPrimary500: '#7b79ff',
          buttonPrimary600: '#4945ff',
          danger100: '#181826',
          danger200: '#4a4a6a',
          danger500: '#ee5e52',
          danger600: '#ee5e52',
          danger700: '#ee5e52',
          neutral0: '#212134',
          neutral100: '#181826',
          neutral1000: '#ffffff',
          neutral150: '#32324d',
          neutral200: '#4a4a6a',
          neutral300: '#666687',
          neutral400: '#a5a5ba',
          neutral500: '#c0c0cf',
          neutral600: '#a5a5ba',
          neutral700: '#eaeaef',
          neutral800: '#ffffff',
          neutral900: '#ffffff',
          primary100: '#181826',
          primary200: '#4a4a6a',
          primary500: '#4945ff',
          primary600: '#7b79ff',
          primary700: '#7b79ff',
          secondary100: '#181826',
          secondary200: '#4a4a6a',
          secondary500: '#66b7f1',
          secondary600: '#66b7f1',
          secondary700: '#b8e1ff',
          success100: '#181826',
          success200: '#4a4a6a',
          success500: '#5cb176',
          success600: '#5cb176',
          success700: '#c6f0c2',
          warning100: '#181826',
          warning200: '#4a4a6a',
          warning500: '#f29d41',
          warning600: '#f29d41',
          warning700: '#fae7b9',
        },
      },
      shadow: {
        filterShadow: '1px 1px 10px rgba(3, 3, 5, 0.35)',
        focus:
          'inset 2px 0px 0px rgb(39, 31, 224), inset 0px 2px 0px rgb(39, 31, 224), inset -2px 0px 0px rgb(39, 31, 224), inset 0px -2px 0px rgb(39, 31, 224)',
        focusShadow: '0px 0px 6px rgba(76, 191, 255, 0.75)',
        popupShadow: '1px 1px 10px rgba(3, 3, 5, 0.35)',
        tableShadow: '1px 1px 10px rgba(3, 3, 5, 0.2)',
      },
    },
  },

  bootstrap(app) {
    console.log(app);
  },
};
