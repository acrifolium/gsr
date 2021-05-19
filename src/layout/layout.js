import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import defaultGsrTheme from '../themes/defaultGsrTheme';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import GsrAppBar from '../components/gsrAppBar/gsrAppBar';
import Footer from '../components/footer/footer';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    position: 'relative',
    minHeight: 'calc(100vh - 64px)',
    width: '100%'
  }
}));

const Layout = ({ component: Component, ...rest }) => {
  const classes = useStyles();

  return (
    <Route
      {...rest}
      render={matchProps => (
        <ThemeProvider theme={defaultGsrTheme}>
          <Box className={classes.root}>
            <CssBaseline />
            <GsrAppBar />
            <main className={classes.content}>
              <Box className={classes.appBarSpacer} />
              <Component {...matchProps} />
            </main>
            <Footer></Footer>
          </Box>
        </ThemeProvider>
      )}
    />
  );
};
export default Layout;
