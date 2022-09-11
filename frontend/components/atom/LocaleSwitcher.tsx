import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from '@mui/icons-material/GTranslate';

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales?.filter((locale) => locale !== activeLocale);

  return (
    <div
      style={{
        marginTop: '0.5em',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: '0.5em',
      }}
    >
      {otherLocales?.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <Link href={{ pathname, query }} as={asPath} locale={locale}>
            <a style={{ color: 'white', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
              <Icon fontSize="small" style={{ marginRight: '1em' }} />
              {locale}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
