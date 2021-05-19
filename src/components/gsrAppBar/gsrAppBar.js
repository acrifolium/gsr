import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import GsrLogo from '../../images/gsr-logo.png';
import Message from '../message/message';

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24
  },
  link: {
    color: 'inherit'
  },
  gsrIconButton: {
    alignItems: 'flex-end',
    '&:hover': {
      background: 'transparent'
    },
    // TODO Find how to disable black background on click
    // '&:active' / '& a:active' don't work
    '& a:active': {
      background: 'transparent'
    },
    [theme.breakpoints.up('md')]: {
      alignItems: 'center'
    }
  },
}));

const  GsrAppBar = (props) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
    >
      <Toolbar className={classes.toolbar}>
        <Box display="flex" width={{ xs: '100%', md: '50%' }} justifyContent="flex-start">
          <Box className={classes.link} component={Link} to="/">
            <img src={GsrLogo} alt="gsr logo" />
          </Box>
        </Box>
      </Toolbar>
      <Message></Message>
    </AppBar>
  );
}

export default GsrAppBar;
