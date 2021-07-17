import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';

import { operator } from '../../state/actions';
import { C_DIALOG, C_LOADING, C_SUCCESS, FormTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import OperatorCreateForm from './components/OperatorCreateForm';

const OperatorRegister = (props) => {
  const { history, profile, loadingAction, success, register, offSuccess } = props;
  const classes = React.useContext(StyleContext);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [operatorData, setOperatorData] = useState(null);

  function onBack() {
    history.goBack();
  }

  function onConfirmationData(data) {
    setOperatorData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    register(operatorData, profile.companyId);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas crear al operador?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Operador creado exitosamente'}
            onOk={() => {
              offSuccess();
              onBack();
            }}
          />
        </>
        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Operador'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Operador',
              title2: 'Crear operador',
            }}
          />
          <OperatorCreateForm onSubmit={onConfirmationData} onBack={onBack} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state.auth;
  const { loadingAction, success } = state.operator;
  return { profile, loadingAction, success };
};

const actionCreators = {
  register: operator.operatorRegister,
  offSuccess: operator.offSuccess,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperatorRegister));
