import { createTheme } from '@mui/material/styles';
import { red, teal } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
          main: teal[500],
        },
        secondary: {
          main: '#00ff00',
        },
        error: {
          main: red.A400,
        },
      },
})

export default theme;