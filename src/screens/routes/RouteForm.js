import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import RouteCreateForm from './components/form/RouteCreateForm';

import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { routesAction } from '../../state/actions/routes';
import { withTranslation } from 'react-i18next';

const RouteForm = (props) => {
  const { route, loading, success, markers, icons, places, selectOne, update, register} = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { newId } = useParams();

  if (newId) {
    selectOne(newId);
  }

  function onBack() {
    history.goBack();
  }

  const onConfirmationData = (data) => {
    data._id ? setAction('actualizar') : setAction('crear');
    setPayload(data);
    setOpenConfirm(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    if (payload._id) {
      update(payload._id, payload);
    } else {
      register(payload);
    }
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={`Ruta`}
            subtitle={{
              inicio: 'Rutas',
              accion: 'Detalle de la ruta',
            }}
          />
          <C_LOADING open={loading} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} la ruta?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Ruta guardada exitosamente'}
            onOk={() => {
              onBack();
            }}
          />

          {!loading && (

            <RouteCreateForm onSubmit={onConfirmationData} onBack={onBack} data={route} markers={markers} icons={icons} places={places} />
           
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { route, loading, success } = state.routes;
  const { markers, icons } = state.maps;
  const { places } = state.place;
  return { route, loading, success, markers, icons, places };
};

const actionCreators = {
  update: routesAction.routesUpdate,
  register: routesAction.routesRegister,
  selectOne: routesAction.routesSelectOne,
};
export default connect(mapStateToProps, actionCreators)(withTranslation()(RouteForm));
