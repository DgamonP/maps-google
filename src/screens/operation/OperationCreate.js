import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Grid, Paper } from '@material-ui/core';

import { C_DIALOG, C_LOADING, C_SUCCESS, C_TYPOGRAPHY, FormTitle } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { StyleContext } from '../../theme/BaseStyles';
import {
  basicTypeTransportUnit,
  boardingMode,
  category,
  company,
  dispatchType,
  measurementUnit,
  operation,
  place,
  typeService,
} from '../../state/actions';
import { C_CHECKBOX } from '../../components';
import OperationCreateForm from './components/OperationCreateForm';

const OperationCreate = (props) => {
  const history = useHistory();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [operationData, setOperationData] = useState(null);
  const [withOneTravel, setWithOneTravel] = useState(false);
  const [withCarrierAssign, setWithCarrierAssign] = useState(false);

  const classes = React.useContext(StyleContext);
  const {
    t,
    userId,
    profile,
    loadingAction,
    register,
    companiesList,
    typeServicesList,
    dispatchTypesList,
    placesList,
    categoriesList,
    boardingModesList,
    measurementUnitsList,
    basicTypeTransportUnitsList,
    success,
    markers,
    fullGeoResults,
    address,
  } = props;

  useEffect(() => {
    companiesList();
    typeServicesList();
    dispatchTypesList();
    placesList();
    measurementUnitsList();
    categoriesList();
    boardingModesList();
    basicTypeTransportUnitsList();
  }, [
    companiesList,
    typeServicesList,
    dispatchTypesList,
    placesList,
    measurementUnitsList,
    categoriesList,
    boardingModesList,
    basicTypeTransportUnitsList,
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
    register(operationData, withOneTravel, withCarrierAssign, userId, profile.companyId, markers);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas crear esta operación?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />

          <C_SUCCESS
            open={success}
            contentText={'Operación creada exitosamente'}
            onOk={() => {
              props.offSuccess();
              history.push('/operation');
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={t('operation.create.title')}
            subtitle={{
              inicio: t('operation.operation'),
              accion: t('operation.create.title'),
            }}
          />

          <Grid item xs={12} style={{ marginTop: 2 }}>
            <C_CHECKBOX
              label={'Crear operación con más de 1 oportunidad'}
              checked={!withOneTravel}
              onChange={() => setWithOneTravel(!withOneTravel)}
            />
          </Grid>
          {withOneTravel && (
            <Grid item xs={12} style={{ marginTop: 2 }}>
              <C_CHECKBOX
                label={'Crear orden de carga directa'}
                checked={withCarrierAssign}
                onChange={() => setWithCarrierAssign(!withCarrierAssign)}
              />
            </Grid>
          )}
          <Grid item xs={12} style={{ marginTop: 2 }}>
            <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
              {t('operation.details.subtitle')}
            </C_TYPOGRAPHY>
          </Grid>
          <OperationCreateForm
            onSubmit={onConfirmationData}
            onBack={onBack}
            t={t}
            markers={markers}
            withOneTravel={withOneTravel}
            withCarrierAssign={withCarrierAssign}
            fullGeoResults={fullGeoResults}
            address={address}
          />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userId, profile } = state.auth;
  const { loadingAction, res, success } = state.operation;
  const { markers, fullGeoResults } = state.maps;
  const { address } = state.mapsGeoFencing;

  // const { loadingActionLO: loadingAction } = state.loadOrder;
  return { userId, profile, loadingAction, res, success, markers, fullGeoResults, address };
};

const actionCreators = {
  register: operation.operationRegister,
  offSuccess: operation.offSuccess,
  companiesList: company.companiesList,
  typeServicesList: typeService.typeServicesList,
  dispatchTypesList: dispatchType.dispatchTypesList,
  placesList: place.placesList,
  // offSuccess: loadOrder.offSuccess,
  categoriesList: category.categoriesList,
  boardingModesList: boardingMode.boardingModesList,
  measurementUnitsList: measurementUnit.measurementUnitsList,
  basicTypeTransportUnitsList: basicTypeTransportUnit.basicTypeTransportUnitsList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperationCreate));
