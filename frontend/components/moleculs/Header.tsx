import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { LanguageSwitcher, useSelectedLanguage } from 'next-export-i18n';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import SymbolLogoLight from '../../public/assets/img/symbol-logo-with-light-text.png';
import SymbolLogoDark from '../../public/assets/img/symbol-logo-with-dark-text.png';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ForumIcon from '@mui/icons-material/Forum';
import TopicIcon from '@mui/icons-material/Topic';

const SITELINKS = [
  { title: 'Top', link: '/', Icon: HomeIcon },
  { title: 'News', link: '/news', Icon: NewspaperIcon },
  { title: 'Community', link: '/community', Icon: ForumIcon },
  { title: 'Docs', link: '/docs', Icon: TopicIcon },
];

export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const router = useRouter();
  const { setLang } = useSelectedLanguage();

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
            <>
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image
                  src={SymbolLogoDark}
                  height={35}
                  width={155}
                  alt="Symbol-Logo"
                  onClick={() => router.push('/')}
                />
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
            {theme.palette.mode === 'dark' ? (
              <Image src={SymbolLogoLight} height={35} width={155} alt="Symbol-Logo" onClick={() => router.push('/')} />
            ) : (
              <Image src={SymbolLogoDark} height={35} width={155} alt="Symbol-Logo" onClick={() => router.push('/')} />
            )}
          </div>
          <div>
            <Divider />
          </div>
          <List>
            {SITELINKS.map((item, index) => (
              <ListItemButton
                key={index}
                style={{ width: '70vh', maxWidth: '300px' }}
                onClick={() => router.push(item.link)}
              >
                <item.Icon />
                <ListItemText primary={item.title} style={{ marginLeft: '1rem' }} />
                <ArrowRightIcon />
              </ListItemButton>
            ))}
          </List>
          <div style={{ marginTop: 'auto', paddingInline: '30px', paddingBlock: '15px' }}>
            <Typography gutterBottom variant="body2" color="text.secondary" align="left">
              Language
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                columnGap: '20px',
                maxWidth: '100%',
                flexWrap: 'wrap',
              }}
            >
              <LanguageSwitcher lang="en">
                <Button>en</Button>
              </LanguageSwitcher>
              <LanguageSwitcher lang="ja">
                <Button>ja</Button>
              </LanguageSwitcher>
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
