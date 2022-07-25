import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import SymbolLogo from '../../public/assets/img/symbol-logo-with-dark-text.png';
import { useRouter } from 'next/router';

const SITELINKS = [
  { title: 'Top', link: '/' },
  { title: 'News', link: '/news' },
  { title: 'Community', link: '/community' },
  { title: 'Docs', link: '/docs' },
];

export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const router = useRouter();

  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          position: 'sticky',
          display: 'flex',
          justifyContent: 'center',
          zIndex: theme.zIndex.appBar,
          top: '20px',
        }}
      >
        <AppBar
          position="absolute"
          style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: theme.palette.text.primary,
            borderRadius: '10px',
          }}
        >
          <Toolbar>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Image src={SymbolLogo} height={35} width={155} alt="Symbol-Logo" onClick={() => router.push('/')} />
            </div>
            {matches || (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: '20px',
                  marginRight: '40px',
                }}
              >
                {SITELINKS.map((item, index) => (
                  <Button
                    variant="text"
                    key={index}
                    onClick={() => router.push(item.link)}
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            )}

            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={() => setOpen(!open)}
              style={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor={'left'} open={open} onClose={() => setOpen(!open)}>
        <List>
          {SITELINKS.map((item, index) => (
            <ListItemButton
              key={index}
              divider
              style={{ width: '70vh', maxWidth: '300px' }}
              onClick={() => router.push(item.link)}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
