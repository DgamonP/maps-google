import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import BenefitCreateForm from './components/form/BenefitCreateForm';

import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { benefit } from '../../state/actions/benefit';
import { withTranslation } from 'react-i18next';

const BenefitFrom = (props) => {
  const { loadingAction, success, offSuccess, details, data, loading, register, update } = props;
  let modifiedData = data;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  let title = 'Crear';
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { benefitId } = useParams();
  // console.log('benefitId ==>', benefitId);
  useEffect(() => {
    if (benefitId) {
      details(benefitId, []);
    }
  }, [benefitId, details]);

  if (data) {
    title = 'Actualizar';
    if (data._id === benefitId) {
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
            title={`${title} beneficio`}
            subtitle={{
              inicio: 'Beneficio',
              accion: `${title} beneficio`,
            }}
          />
          <>
            <C_LOADING open={loadingAction || loading} />
            <C_DIALOG
              open={openConfirm}
              contentText={`¿Estás segur@ que deseas ${action} el beneficio?`}
              onClose={() => setOpenConfirm(false)}
              onCancel={() => setOpenConfirm(false)}
              width={320}
              okText={'Sí, confirmar'}
              onSubmit={onSubmit}
            />
            <C_SUCCESS
              open={success}
              contentText={'Beneficio guardado exitosamente'}
              onOk={() => {
                offSuccess();
                onBack();
              }}
            />
          </>
          {!loading && (
            <BenefitCreateForm onSubmit={onConfirmationData} onBack={onBack} data={modifiedData} />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { benefits, data, loadingAction, loading, success } = state.benefit;
  return { benefits, data, loadingAction, loading, success };
};

const actionCreators = {
  load: benefit.load,
  offSuccess: benefit.offSuccess,
  list: benefit.benefitsList,
  details: benefit.benefitDetails,
  register: benefit.benefitRegister,
  update: benefit.benefitUpdate,
  activateDesactivate: benefit.benefitActivateDesactivate,
};
export default connect(mapStateToProps, actionCreators)(withTranslation()(BenefitFrom));
