import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  {
    code: 'ja',
    label: '日本語',
  },
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'ko',
    label: '한국어',
  },
  {
    code: 'zh',
    label: '中文',
  },
];

export default function LocaleSwitcher(props: { inDrawer: boolean }): JSX.Element {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [state, setState] = useState<string>(i18n.language);

  useEffect(() => {
    setState(i18n.language);
  }, [i18n.language]);

  const onSelected: SelectProps<string>['onChange'] = (event) => {
    setState(event.target.value);
    i18n.changeLanguage(event.target.value).catch(console.error);
  };

  return (
    <FormControl fullWidth>
      <Select
        variant='outlined'
        id='language-select'
        value={state}
        onChange={onSelected}
        size='small'
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
