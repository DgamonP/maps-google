
import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { C_Sidebar } from './partials/sidebar/sidebar';
import  C_Header from './partials/header/header';

import { StyleContext } from "../theme/BaseStyles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="left" 
      style={{ position: 'fixed', bottom: 0, background: '#e8e8e8', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, width: '100%' }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" 
        onClick={ (event) => {
          event.preventDefault();
        } }
      >
        DeltaX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const  App = ( props ) => {

  const { children, loggedIn, theme } = props;

  const classes = React.useContext(StyleContext);
  const [open, setOpen] = React.useState(true);
  const [openResponsive, setOpenResponsive] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function onComponentHeader() {
    if ( !loggedIn )return null;
    return (
      <C_Header 
        onClick={handleDrawerOpen}
        open={open}
        onResponsive={ () => setOpenResponsive( true ) }
      />
    );
  }

  function onComponentSidebar() {
    if ( !loggedIn )return null;
    return (
      <C_Sidebar 
        open={open}
        onClick={handleDrawerClose}
        theme={theme}
        openResponsive={openResponsive}
        onResponsive={ () => setOpenResponsive( false ) }
      />
    );
  }

  function onComponentFooter() {
    if ( !loggedIn )return null;
    return (
      <Box pt={4}>
        <Copyright />
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      { onComponentHeader() }

      { onComponentSidebar() }
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

          <Grid container spacing={3}>
            
            <Grid item xs={12}>
              <div className={classes.paper}>
                {children}
              </div>
            </Grid>

          </Grid>
          
          { onComponentFooter() }
      </main>
    </div>
  );
}

export default App;
