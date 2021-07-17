import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';

import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { basicTypeTransportUnit } from '../../state/actions';
import { withTranslation } from 'react-i18next';
import BasicTypeTransportUnitForm from './components/BasicTypeTransportUnitForm';

const BasicTypeTransportUnit = (props) => {
  const { loadingAction, success, offSuccess, details, data, loading, register, update } = props;
  let modifiedData = data;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  let title = 'Crear';
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { basicTypeTransportUnitId } = useParams();
  // console.log('basicTypeTransportUnitId ==>', basicTypeTransportUnitId);
  useEffect(() => {
    if (basicTypeTransportUnitId) {
      details(basicTypeTransportUnitId, []);
    }
  }, [details]);

  if (data) {
    title = 'Actualizar';
    if (data._id === basicTypeTransportUnitId) {
      modifiedData = {
        ...data,
      };
    }
    // console.log('DATA ==> ', modifiedData);
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
    // console.log('onSubmit', data);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={`${title} tipo de unidad de transporte`}
            subtitle={{
              inicio: 'Tipo de unidad de transporte',
              accion: `${title} tipo de unidad de transporte`,
            }}
          />
          <C_LOADING open={loadingAction || loading} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} el tipo de unidad de transporte?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Tipo de unidad de transporte guardada exitosamente'}
            onOk={() => {
              offSuccess();
              onBack();
            }}
          />

          {!loading && (
            <BasicTypeTransportUnitForm
              onSubmit={onConfirmationData}
              onBack={onBack}
              data={modifiedData}
            />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data, loadingAction, loading, success } = state.basicTypeTransportUnit;
  return { data, loadingAction, loading, success };
};

const actionCreators = {
  load: basicTypeTransportUnit.load,
  offSuccess: basicTypeTransportUnit.offSuccess,
  details: basicTypeTransportUnit.basicTypeTransportUnitDetails,
  register: basicTypeTransportUnit.basicTypeTransportUnitRegister,
  update: basicTypeTransportUnit.basicTypeTransportUnitUpdate,
};
export default connect(mapStateToProps, actionCreators)(withTranslation()(BasicTypeTransportUnit));
