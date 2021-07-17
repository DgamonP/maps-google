
import React from 'react';
import { useHistory } from 'react-router';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from "../../theme/BaseStyles";
import ModuleUpdateForm from './components/ModuleUpdateForm';

import { FormTitle } from '../../components';

const ModuleUpdate = ( props ) => {

  const {} = props;
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  function onBack() {
    history.goBack();
  }

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>

          <FormTitle 
            onBack={onBack}
            title={ 'Actualiza modulo' }
            subtitle={ {
                inicio: 'Configuración',
                accion: 'Actualizar modulo',
            } }
          />

          <ModuleUpdateForm onSubmit={onSubmit} onBack={onBack} />
        </Grid>
      </Paper>
    </div>
  );

};

export default ModuleUpdate;
