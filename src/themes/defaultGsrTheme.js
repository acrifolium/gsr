import { createMuiTheme } from '@material-ui/core/styles';
import 'fontsource-roboto';

const defaultGsrTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: '0 !important',
          WebkitFontSmoothing: 'antialiased'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Roboto'
  },
  palette: {
    primary: { main: '#333', contrastText: '#fff' },
    secondary: { main: '#da291c', contrastText: '#fff' }
  }
});

export default defaultGsrTheme;
