import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Paper } from '@material-ui/core';

import { C_DIALOG, C_LOADING, C_SUCCESS, C_TYPOGRAPHY, FormTitle } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { StyleContext } from '../../theme/BaseStyles';
import { company, dispatchType, operation, place, typeService } from '../../state/actions';
import OperationCreateForm from './components/OperationCreateForm';

const OperationUpdate = (props) => {
  const history = useHistory();
  const { operationId } = useParams();
  const classes = React.useContext(StyleContext);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [operationData, setOperationData] = useState(null);

  const {
    t,
    userId,
    profile,
    operation,
    loadingAction,
    update,
    details,
    companiesList,
    typeServicesList,
    dispatchTypesList,
    placesList,
    success,
  } = props;

  useEffect(() => {
    if (!operation) {
      details(operationId, []);
    }
    companiesList();
    typeServicesList();
    dispatchTypesList();
    placesList();
  }, [
    companiesList,
    typeServicesList,
    dispatchTypesList,
    placesList,
    operation,
    operationId,
    details,
  ]);

  function onBack() {
    history.goBack();
  }

  function onConfirmationData(data) {
    setOperationData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    update(operationId, operationData, userId, profile.companyId);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas actualizar esta operación?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />

          <C_SUCCESS
            open={success}
            contentText={'Operación actualizada exitosamente'}
            onOk={() => {
              props.offSuccess();
              history.goBack();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Editar operación'}
            subtitle={{
              inicio: t('operation.operation'),
              accion: t('operation.details.subtitle'),
              accion2: 'Editar operación',
            }}
          />

          <Grid item xs={12} style={{ marginTop: 2 }}>
            <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
              {t('operation.details.subtitle')}
            </C_TYPOGRAPHY>
          </Grid>
          {operation ? (
            <OperationCreateForm onSubmit={onConfirmationData} onBack={onBack} t={t} />
          ) : (
            <C_LOADING open={true} />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userId, profile } = state.auth;
  const { operation, loadingAction, res, success } = state.operation;
  return { userId, profile, operation, loadingAction, res, success };
};

const actionCreators = {
  update: operation.operationUpdate,
  details: operation.operationDetails,
  offSuccess: operation.offSuccess,
  companiesList: company.companiesList,
  typeServicesList: typeService.typeServicesList,
  dispatchTypesList: dispatchType.dispatchTypesList,
  placesList: place.placesList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperationUpdate));
