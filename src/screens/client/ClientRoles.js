import React from 'react';
import { useHistory } from 'react-router';

import { Grid, Paper } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';

import { StyleContext } from "../../theme/BaseStyles";
import ClientRolesForm from './components/ClientRolesForm';

import { Montserrat } from '../../theme/fontFamily';
import { C_TYPOGRAPHY } from '../../components';

const ClientRoles = ( props ) => {

  const {} = props;
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  function onBack() {
    history.goBack();
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>
          
          <Grid item xs={12}>
            <KeyboardBackspace 
              fontSize='large' 
              onClick={onBack} 
              style={{ cursor: 'pointer', color: '#070707' }}
            />
          </Grid>

          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
                { 'Rol cliente'}
            </C_TYPOGRAPHY>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10, }}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={18}>
                { 'Miguel Angles Flores'}
            </C_TYPOGRAPHY>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 1, }}>
            <C_TYPOGRAPHY fontFamily={Montserrat.ExtraLight} fontSize={12}>
                { 'Configuración' } &gt; { 'Roles del cliente' }
            </C_TYPOGRAPHY>
          </Grid>
          <ClientRolesForm 
            onSubmit={onSubmit} 
            onBack={onBack}
            className={classes}
          />
        </Grid>
      </Paper>
    </div>
  );

};

export default ClientRoles;
