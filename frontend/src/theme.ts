import createTheme from '@mui/material/styles/createTheme';

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
  palette: {
    mode: 'dark',
  },
});
