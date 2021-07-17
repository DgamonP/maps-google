import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Grid, Paper } from '@material-ui/core';

import { C_DIALOG, C_LOADING, C_SUCCESS, FormTitle } from '../../components';
import { operator } from '../../state/actions';
import { StyleContext } from '../../theme/BaseStyles';
import OperatorCreateForm from './components/OperatorCreateForm';

const OperatorUpdate = (props) => {
  const classes = React.useContext(StyleContext);
  const { operatorId } = useParams();
  const { history, userId, operators, loadingAction, success, update, details, offSuccess } = props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [operatorData, setOperatorData] = useState(null);

  useEffect(() => {
    details(operatorId, operators);
  }, [details, operatorId, operators]);

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
    update(operatorId, operatorData, userId);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas editar al operador?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Operador guardado exitosamente'}
            onOk={() => {
              offSuccess();
              onBack();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Actualizar operador'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Operador',
              title2: 'Actualizar operador',
            }}
          />
          <OperatorCreateForm onSubmit={onConfirmationData} onBack={onBack} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userId } = state.auth;
  const { operators, loadingAction, success } = state.operator;
  return { userId, operators, loadingAction, success };
};

const actionCreators = {
  update: operator.operatorUpdate,
  details: operator.operatorDetails,
  offSuccess: operator.offSuccess,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperatorUpdate));
