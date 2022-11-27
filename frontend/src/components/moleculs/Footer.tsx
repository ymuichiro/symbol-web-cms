import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@/components/atom/Link';
import { IoChatbubbleSharp, IoLogoGithub, IoLogoTwitter } from 'react-icons/io5';
import { NAVIGATIONS } from '@/navigation/Root';

export default function Footer(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: matches ? 'flex-start' : 'center',
          gap: matches ? '10px' : '50px',
          flexDirection: matches ? 'column' : 'row',
          width: '100%',
        }}
      >
        <div>
          <Link href={NAVIGATIONS.news.path}>News</Link>
        </div>
        <div>
          <Link href={NAVIGATIONS.community.path}>Community</Link>
        </div>
        <div>
          <Link href={NAVIGATIONS.docs.path}>Docs</Link>
        </div>
        <div>
          <Link href={'https://twitter.com/symnem_com_info'} rel='noopener noreferrer' target='_blank'>
            Contract
          </Link>
        </div>
        <div style={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            aria-label='github link'
            LinkComponent={'a'}
            href='https://github.com/symbol'
            rel='noopener noreferrer'
            target='_blank'
          >
            <IoLogoGithub />
          </IconButton>
          <IconButton
            aria-label='twitter link'
            LinkComponent={'a'}
            href='https://twitter.com/thesymbolchain'
            rel='noopener noreferrer'
            target='_blank'
          >
            <IoLogoTwitter />
          </IconButton>
          <IconButton
            aria-label='discord link'
            LinkComponent={'a'}
            href='https://discord.gg/EEdJKBMVVb'
            rel='noopener noreferrer'
            target='_blank'
          >
            <IoChatbubbleSharp />
          </IconButton>
        </div>
      </div>
    </>
  );
}
