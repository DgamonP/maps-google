import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import FeatureCreateForm from './components/form/featureCreateForm';

import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { feature } from '../../state/actions/features';
import { withTranslation } from 'react-i18next';

const FeatureRegister = (props) => {
  const { loadingAction, success, offSuccess, details, data, loading, register, update } = props;
  let modifiedData = data;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  let title = 'Crear';
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { featureId } = useParams();

  useEffect(() => {
    if (featureId) {
      details(featureId, []);
    }
  }, [details]);

  if (data) {
    title = 'Actualizar';
    if (data._id === featureId) {
      modifiedData = data;
      if (modifiedData.Qualitative) {
        modifiedData = { ...modifiedData, typeFeature: 'Qualitative' };
        modifiedData.values = modifiedData.values.map((item) => ({
          value: item.valueQualitative,
        }));
      } else {
        modifiedData = { ...modifiedData, typeFeature: 'Quantitative' };
        modifiedData.values = modifiedData.values.map((item) => ({
          value: item.valueQuantitative,
        }));
      }
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
            title={`${title} característica`}
            subtitle={{
              inicio: 'Características',
              accion: `${title} característica`,
            }}
          />
          <C_LOADING open={loadingAction || loading} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} la característica?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Característica guardada exitosamente'}
            onOk={() => {
              offSuccess();
              onBack();
            }}
          />

          {!loading && (
            <FeatureCreateForm onSubmit={onConfirmationData} onBack={onBack} data={modifiedData} />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { features, data, loadingAction, loading, success } = state.feature;
  return { features, data, loadingAction, loading, success };
};

const actionCreators = {
  load: feature.load,
  offSuccess: feature.offSuccess,
  list: feature.featuresList,
  details: feature.featureDetails,
  register: feature.featureRegister,
  update: feature.featureUpdate,
  activateDesactivate: feature.featureActivateDesactivate,
};
export default connect(mapStateToProps, actionCreators)(withTranslation()(FeatureRegister));
