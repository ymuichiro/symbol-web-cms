import { Theme as MuiTheme } from '@mui/material/styles/createTheme';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
