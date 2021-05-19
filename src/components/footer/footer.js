import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Copyright from '../copyright/copyright';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'none',
    background: '#fff',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box pt={4}>
        <Copyright />
      </Box>
    </footer>
  );
}

export default Footer;
