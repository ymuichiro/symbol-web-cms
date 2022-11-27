import { useTheme } from '@mui/material/styles';
import Markdown from 'react-markdown';
import Typography from '@mui/material/Typography';
import CodeBlock from '@/components/atom/CodeBlock';
import Link from '@mui/material/Link';
import { getImageUri } from '@/services/StrapiService';
import { Fragment } from 'react';

export default function MarkdownParser(props: { markdown: string }): JSX.Element {
  const theme = useTheme();

  return (
    <Markdown
      components={{
        h1: (e) => (
          <Typography
            variant='h1'
            fontWeight='bold'
            fontSize='2.5rem'
            style={{ marginBottom: '1rem', marginTop: '8rem' }}
          >
            {e.children}
          </Typography>
        ),
        h2: (e) => (
          <Typography
            variant='h2'
            fontWeight='bold'
            fontSize='2rem'
            style={{ marginBottom: '1rem', marginTop: '6rem', color: theme.palette.primary.main }}
          >
            {e.children}
          </Typography>
        ),
        h3: (e) => (
          <Typography
            variant='h3'
            fontWeight='bold'
            fontSize='1.5rem'
            style={{ marginBottom: '1rem', marginTop: '3rem' }}
          >
            {e.children}
          </Typography>
        ),
        h4: (e) => (
          <Typography
            variant='h4'
            fontWeight='bold'
            fontSize='1rem'
            style={{ marginBottom: '1rem', marginTop: '1.5rem' }}
          >
            {e.children}
          </Typography>
        ),
        h5: (e) => (
          <Typography
            variant='h5'
            fontWeight='bold'
            fontSize='0.8rem'
            style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
          >
            {e.children}
          </Typography>
        ),
        h6: (e) => (
          <Typography
            variant='h6'
            fontWeight='bold'
            fontSize='0.6rem'
            style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
          >
            {e.children}
          </Typography>
        ),
        img: (e) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            {e.src !== undefined && (
              <img
                src={getImageUri(e.src) as string}
                alt='strapi-blog-api-image'
                style={{
                  objectFit: 'contain',
                  maxHeight: '500px',
                  maxWidth: '90vw',
                  width: '100%',
                }}
              />
            )}
          </div>
        ),
        code: CodeBlock,
        a: (e) => (
          <Link href={e.href} style={{ color: theme.palette.text.primary }}>
            {e.children}
          </Link>
        ),
        p: (e) => {
          // Added processing that img tags are not enclosed in p tags when children are objects, because they are enclosed in p tags.
          const elements = e.children.map((child, index) => {
            if (typeof child !== 'string') {
              return <Fragment key={index}>{child}</Fragment>;
            }
            return (
              <Typography key={index} variant='body1' style={{ marginBottom: '2rem', lineHeight: '1.8rem' }}>
                {child}
              </Typography>
            );
          });
          return <>{elements}</>;
        },
        li: (e) => {
          console.log(e);
          return (
            <li>
              <Typography>{e.children}</Typography>
            </li>
          );
        },
      }}
    >
      {props.markdown}
    </Markdown>
  );
}
