import { useTheme } from '@mui/material/styles';
import Markdown from 'react-markdown';
import Typography from '@mui/material/Typography';
import CodeBlock from '@/components/atom/CodeBlock';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import remarkGfm from 'remark-gfm';

export default function MarkdownParser(props: { markdown: string }): JSX.Element {
  const theme = useTheme();

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
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
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            {e.src !== undefined && (
              <Image
                width={1980}
                height={1150}
                sizes='100vw'
                src={e.src.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL}${e.src}` : e.src}
                alt='strapi-blog-api-image'
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            )}
          </div>
        ),
        code: CodeBlock,
        a: (e) => (
          <Link href={e.href || '/'} style={{ color: theme.palette.primary.main }}>
            {e.children}
          </Link>
        ),
        br: () => {
          return <br />;
        },
        span: (e) => {
          return <span>{e.children}</span>;
        },
        table: (e) => {
          return (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label={'article-table'}>
                {e.children}
              </Table>
            </TableContainer>
          );
        },
        thead: (e) => {
          return <TableHead style={{ backgroundColor: theme.palette.common.white }}>{e.children}</TableHead>;
        },
        tbody: (e) => {
          return <TableBody>{e.children}</TableBody>;
        },
        tr: (e) => {
          return <TableRow>{e.children}</TableRow>;
        },
        th: (e) => {
          return <TableCell style={{ color: theme.palette.common.black, fontWeight: 'bold' }}>{e.children}</TableCell>;
        },
        td: (e) => {
          return <TableCell>{e.children}</TableCell>;
        },
        p: (e) => {
          const elements = e.children.map((child, index) => {
            // Added processing that img tags are not enclosed in p tags when children are objects, because they are enclosed in p tags.
            if (typeof child !== 'string') {
              return <Fragment key={index}>{child}</Fragment>;
            }
            return (
              <Typography key={index} variant='body1' component={'span'} style={{ whiteSpace: 'pre-wrap' }}>
                {child}
              </Typography>
            );
          });
          return <div style={{ marginBottom: '1rem' }}>{elements}</div>;
        },
        ul: (e) => <List sx={{ listStyleType: 'disc', pl: 2 }}>{e.children}</List>,
        li: (e) => (
          <ListItem disableGutters disablePadding style={{ display: 'list-item' }}>
            <ListItemText primary={e.children} />
          </ListItem>
        ),
      }}
    >
      {props.markdown.replace(/\n\n\n/gi, '\n\n &nbsp; \n')}
    </Markdown>
  );
}
