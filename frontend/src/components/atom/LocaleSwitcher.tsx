import { useState } from 'react';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { languages, languageSwitchToStrapi } from '@/languages';
import ListItemButton from '@mui/material/ListItemButton';

export interface ArticleIdByLanguage {
  lang: string;
  id: number;
}

type Props = {
  articleIdByLanguage?: ArticleIdByLanguage[];
};

export default function LocaleSwitcher(props: Props): JSX.Element {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { locales, locale } = router;
  const otherLocales = (locales || []).filter((l) => l !== locale);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        fullWidth
        variant='contained'
        color='inherit'
        aria-describedby={id}
        onClick={onClick}
        style={{ color: 'black', fontWeight: 'bold' }}
      >
        {languages.find((e) => e.code === locale)?.label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
          {otherLocales.map((l, index) => {
            if (props.articleIdByLanguage) {
              const articleId = props.articleIdByLanguage.find((e) => e.lang === languageSwitchToStrapi(l))?.id;
              const label = languages.find((e) => e.code === l)?.label;
              const { pathname, query } = router;
              const q = articleId ? { id: articleId.toString() } : query;
              return (
                <ListItemButton
                  key={index}
                  style={{ color: 'black', fontWeight: 'bold' }}
                  onClick={() => router.push({ pathname, query: q }, undefined, { locale: l, scroll: false })}
                >
                  {label}
                </ListItemButton>
              );
            } else {
              const label = languages.find((e) => e.code === l)?.label;
              const { pathname, query } = router;
              return (
                <ListItemButton
                  key={index}
                  style={{ color: 'black', fontWeight: 'bold' }}
                  onClick={() => router.push({ pathname, query }, undefined, { locale: l, scroll: false })}
                >
                  {label}
                </ListItemButton>
              );
            }
          })}
        </List>
      </Popover>
    </>
  );
}
