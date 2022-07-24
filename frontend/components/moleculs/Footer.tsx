import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

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
          gap: matches ? '0px' : '50px',
          flexDirection: matches ? 'column' : 'row',
          width: '100%',
        }}
      >
        <div>
          <Typography>
            <Link href={'/'}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>News</a>
            </Link>
          </Typography>
        </div>
        <div>
          <Typography>
            <Link href={'/'}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>Community</a>
            </Link>
          </Typography>
        </div>
        <div>
          <Typography>
            <Link href={'/'}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>Docs</a>
            </Link>
          </Typography>
        </div>
        <div>
          <Typography>
            <Link href={'/'}>
              <a style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>Contract</a>
            </Link>
          </Typography>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton>
            <GitHubIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
