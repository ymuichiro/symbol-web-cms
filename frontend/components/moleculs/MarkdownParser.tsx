import { useTheme } from '@mui/material/styles';
import Markdown from 'react-markdown';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from '../../components/atom/CodeBlock';
import UtilService from '../../service/UtilService';
import { useRouter } from 'next/router';
import { useLanguageQuery } from '../../hooks/useLanguageQuery';

export default function MarkdownParser(props: { markdown: string }): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const languageQuery = useLanguageQuery(router);

  return (
    <Markdown
      components={{
        h1: (e) => (
          <Typography variant="h1" fontWeight="bold" fontSize="1.5rem">
            {e.children}
          </Typography>
        ),
        h2: (e) => (
          <Typography variant="h2" fontWeight="bold" fontSize="1.2rem">
            {e.children}
          </Typography>
        ),
        h3: (e) => (
          <Typography variant="h3" fontWeight="bold" fontSize="1.0rem">
            {e.children}
          </Typography>
        ),
        h4: (e) => (
          <Typography variant="h4" fontWeight="bold" fontSize="0.8rem">
            {e.children}
          </Typography>
        ),
        h5: (e) => (
          <Typography variant="h5" fontWeight="bold" fontSize="0.6rem">
            {e.children}
          </Typography>
        ),
        h6: (e) => (
          <Typography variant="h6" fontWeight="bold" fontSize="0.4rem">
            {e.children}
          </Typography>
        ),
        img: (e) => (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {e.src && (
              <Image
                src={e.src}
                alt="Symbol-Logo-White"
                height={500}
                width={theme.breakpoints.values.md}
                objectFit="contain"
              />
            )}
          </div>
        ),
        code: CodeBlock,
        a: (e) => (
          <Typography>
            <Link
              href={
                new RegExp(/^http.?:\/\/.*/).test(e.href || '')
                  ? e.href || '/'
                  : { pathname: e.href || '/', query: languageQuery }
              }
            >
              <a style={{ color: theme.palette.text.primary }}>{e.children}</a>
            </Link>
          </Typography>
        ),
        p: (e) => <Typography variant="body1">{e.children}</Typography>,
        li: (e) => (
          <li>
            <Typography>{e.children}</Typography>
          </li>
        ),
      }}
      transformImageUri={(src) => UtilService.switchUrl(src)}
    >
      {props.markdown}
    </Markdown>
  );
}
