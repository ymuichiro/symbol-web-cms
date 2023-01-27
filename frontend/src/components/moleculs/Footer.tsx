import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import { IoChatbubbleSharp, IoLogoGithub, IoLogoTwitter } from 'react-icons/io5';
import { CSSProperties } from 'react';
import Link from 'next/link';

type Props = {
  style?: CSSProperties;
};

export default function Footer(props: Props): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: matches ? 'flex-start' : 'center',
        gap: matches ? '10px' : '50px',
        flexDirection: matches ? 'column' : 'row',
        width: '100%',
        marginTop: '10vh',
        marginBottom: '5vh',
        ...props.style,
      }}
    >
      {[
        { href: '/news', title: 'News' },
        { href: '/community', title: 'Community' },
        { href: '/documents', title: 'Docs' },
        { href: '/news', title: 'News' },
      ].map((e, i) => (
        <div key={i}>
          <Link href={e.href} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            {e.title}
          </Link>
        </div>
      ))}

      <div>
        <Link
          href={'https://twitter.com/symnem_com_info'}
          rel='noopener noreferrer'
          target='_blank'
          style={{ textDecoration: 'none', color: theme.palette.primary.main }}
        >
          Contract
        </Link>
      </div>
      <div style={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          aria-label='github link'
          LinkComponent={Link}
          href='https://github.com/symbol'
          rel='noopener noreferrer'
          target='_blank'
        >
          <IoLogoGithub />
        </IconButton>
        <IconButton
          aria-label='twitter link'
          LinkComponent={Link}
          href='https://twitter.com/thesymbolchain'
          rel='noopener noreferrer'
          target='_blank'
        >
          <IoLogoTwitter />
        </IconButton>
        <IconButton
          aria-label='discord link'
          LinkComponent={Link}
          href='https://discord.gg/EEdJKBMVVb'
          rel='noopener noreferrer'
          target='_blank'
        >
          <IoChatbubbleSharp />
        </IconButton>
      </div>
    </div>
  );
}
