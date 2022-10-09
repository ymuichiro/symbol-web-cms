import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

const LANGUAGES = [
  {
    code: 'ja-JP',
    label: '日本語',
  },
  {
    code: 'en-US',
    label: 'English',
  },
  {
    code: 'ko-KR',
    label: '한국어'
  }
];

export default function LocaleSwitcher(props: { inDrawer: boolean }) {
  const router = useRouter();
  const theme = useTheme();
  const [state, setState] = useState<string>('en-US');
  const { locale } = router;

  useEffect(() => {
    if (router.isReady && locale) {
      setState(locale);
    }
  }, [locale]);

  const onSelected: SelectProps<string>['onChange'] = (event) => {
    setState(event.target.value);
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale: event.target.value });
  };

  return (
    <FormControl fullWidth>
      <Select
        variant="outlined"
        id="language-select"
        value={state}
        onChange={onSelected}
        size="small"
        style={{
          color: props.inDrawer ? theme.palette.text.primary : theme.palette.primary.contrastText,
          border: 'grey 0px solid',
          fontWeight: 'bold',
          width: props.inDrawer ? '100%' : undefined,
        }}
      >
        {LANGUAGES.map((lang, index) => (
          <MenuItem key={index} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
