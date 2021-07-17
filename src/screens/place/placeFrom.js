import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import PlaceCreateForm from './components/form/placeCreateForm';
import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { place } from '../../state/actions/place';

const PlaceRegister = (props) => {
  const { loadingAction, success, offSuccess, details, data, loading, register, update } = props;
  let modifiedData = data;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  let title = 'Crear';
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { placeId } = useParams();

  useEffect(() => {
    if (placeId) {
      details(placeId, []);
    }
  }, [details, placeId]);

  if (data) {
    title = 'Actualizar';
    if (data._id === placeId) {
      modifiedData = {
        ...data,
      };
    }
  }

  function onBack() {
    history.goBack();
  }

  const onConfirmationData = (data) => {
    // console.log('data ==>', data);
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
            title={`${title} país`}
            subtitle={{
              inicio: 'Países',
              accion: `${title} país`,
            }}
          />
          <C_LOADING open={loadingAction || loading} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} el país?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'País guardado exitosamente'}
            onOk={() => {
              offSuccess();
              onBack();
            }}
          />

          {!loading && (
            <PlaceCreateForm onSubmit={onConfirmationData} onBack={onBack} data={modifiedData} />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { places, data, loadingAction, loading, success } = state.place;
  return { places, data, loadingAction, loading, success };
};

const actionCreators = {
  load: place.load,
  offSuccess: place.offSuccess,
  list: place.placesList,
  details: place.placeDetails,
  register: place.placeRegister,
  update: place.placeUpdate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(PlaceRegister));
