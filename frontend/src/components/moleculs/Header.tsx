import SymbolLogoDark from '@/assets/logo/symbol-logo-with-dark-text.webp';
import SymbolLogoLight from '@/assets/logo/symbol-logo-with-light-text.webp';
import symbol from '@/assets/logo/symbol.webp';
import LocaleSwitcher from '@/components/atom/LocaleSwitcher';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Fragment, useState } from 'react';
import {
  IoChatbubblesSharp,
  IoChevronForwardOutline,
  IoDocumentTextSharp,
  IoHomeSharp,
  IoMenuOutline,
  IoNewspaperSharp,
} from 'react-icons/io5';

const SITELINKS = [
  { title: 'Top', link: '/', Icon: IoHomeSharp },
  { title: 'News', link: '/news', Icon: IoNewspaperSharp },
  { title: 'Community', link: '/community', Icon: IoChatbubblesSharp },
  { title: 'Docs', link: '/docs', Icon: IoDocumentTextSharp },
];

export default function Header(): JSX.Element {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const xssMatches = useMediaQuery('@media screen and (min-width:250px)');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
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
          position='absolute'
          style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: theme.palette.text.primary,
            borderRadius: '10px',
          }}
        >
          <Toolbar>
            <>
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <ButtonBase aria-label='logo' LinkComponent={'a'} href='/'>
                  {xssMatches ? (
                    <img src={SymbolLogoDark} height={35} width={155} alt='Symbol-Logo' />
                  ) : (
                    <img src={symbol} height={35} width={35} alt='Symbol-Logo' />
                  )}
                </ButtonBase>
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
                      variant='text'
                      key={index}
                      LinkComponent={'a'}
                      href={item.link}
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        minWidth: '6rem',
                      }}
                    >
                      {item.title}
                    </Button>
                  ))}
                  <LocaleSwitcher inDrawer={false} />
                </div>
              )}

              <IconButton
                size='large'
                edge='start'
                aria-label='menu'
                onClick={() => setOpen(!open)}
                style={{ color: 'black' }}
              >
                <IoMenuOutline />
              </IconButton>
            </>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor={'left'} open={open} onClose={() => setOpen(!open)}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            maxWidth: '300px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <ButtonBase aria-label='logo' LinkComponent={'a'} href={'/'}>
              <img
                src={theme.palette.mode === 'dark' ? SymbolLogoLight : SymbolLogoDark}
                height={35}
                width={155}
                alt='Symbol-Logo'
              />
            </ButtonBase>
          </div>
          <div>
            <Divider />
          </div>
          <List>
            {SITELINKS.map((item, index) => (
              <ListItemButton
                key={index}
                style={{ width: '70vh', maxWidth: '300px' }}
                LinkComponent={'a'}
                href={item.link}
              >
                <item.Icon />
                <ListItemText primary={item.title} style={{ marginLeft: '1rem' }} />
                <IoChevronForwardOutline />
              </ListItemButton>
            ))}
            <ListItem>
              <LocaleSwitcher inDrawer={true} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
}
