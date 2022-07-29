import en from '../locales/en';
import ja from '../locales/ja';
import { useRouter } from 'next/router';

// switch locale
export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : ja;
  return {
    t,
    locale: locale === undefined ? 'en' : locale,
  };
};
