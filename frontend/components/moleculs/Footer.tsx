import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const router = useRouter();

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: matches ? 'flex-start' : 'center',
          gap: matches ? '0px' : '50px',
          flexDirection: matches ? 'column' : 'row',
          width: '100%',
        }}
      >
        <div>
          <Typography>
            <Link href={{ pathname: '/news' }}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>News</a>
            </Link>
          </Typography>
        </div>
        <div>
          <Typography>
            <Link href={{ pathname: '/community' }}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>Community</a>
            </Link>
          </Typography>
        </div>
        <div>
          <Typography>
            <Link href={{ pathname: '/docs' }}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>Docs</a>
            </Link>
          </Typography>
        </div>
        <div>
          <Typography>
            <Link href={'https://twitter.com/symnem_com_info'}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>Contract</a>
            </Link>
          </Typography>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => router.push('https://github.com/symbol')}>
            <GitHubIcon />
          </IconButton>
          <IconButton onClick={() => router.push('https://twitter.com/thesymbolchain')}>
            <TwitterIcon />
          </IconButton>
          <IconButton onClick={() => router.push('https://discord.gg/xymcity')}>
            <ChatIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
