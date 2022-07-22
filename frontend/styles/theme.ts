import { createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
          color: "darkred",
          backgroundColor: "grey",
          "& h1": {
            color: "black",
          },
        },
      },
    },
  },
});
