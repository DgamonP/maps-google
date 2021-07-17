import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { city, place } from '../../state/actions';
import CityForm from './components/CityForm';

const CityDetails = (props) => {
  const {
    loadingAction,
    success,
    offSuccess,
    details,
    data,
    loading,
    register,
    update,
    placesList,
  } = props;
  let modifiedData = data;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  let title = 'Crear';
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { cityId } = useParams();

  useEffect(() => {
    if (cityId) {
      details(cityId, []);
    }
    placesList();
  }, [details, cityId, placesList]);

  if (data) {
    title = 'Actualizar';
    if (data._id === cityId) {
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
            title={`${title} ciudad`}
            subtitle={{
              inicio: 'Ciudad',
              accion: `${title} ciudad`,
            }}
          />
          <>
            <C_LOADING open={loadingAction || loading} />
            <C_DIALOG
              open={openConfirm}
              contentText={`¿Estás segur@ que deseas ${action} la ciudad?`}
              onClose={() => setOpenConfirm(false)}
              onCancel={() => setOpenConfirm(false)}
              width={320}
              okText={'Sí, confirmar'}
              onSubmit={onSubmit}
            />
            <C_SUCCESS
              open={success}
              contentText={'Ciudad guardada exitosamente'}
              onOk={() => {
                offSuccess();
                onBack();
              }}
            />
          </>
          {!loading && (
            <CityForm onSubmit={onConfirmationData} onBack={onBack} data={modifiedData} />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { citys, data, loadingAction, loading, success } = state.city;
  return { citys, data, loadingAction, loading, success };
};

const actionCreators = {
  load: city.load,
  offSuccess: city.offSuccess,
  list: city.citysList,
  details: city.cityDetails,
  register: city.cityRegister,
  update: city.cityUpdate,
  placesList: place.placesList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(CityDetails));
