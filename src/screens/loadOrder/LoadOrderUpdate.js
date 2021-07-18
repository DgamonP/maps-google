import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { C_DIALOG, C_LOADING, C_SUCCESS, C_TYPOGRAPHY, FormTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import LoadOrderCreateForm from './components/LoadOrderCreateForm';
import {
  basicTypeTransportUnit,
  boardingMode,
  category,
  loadOrder,
  measurementUnit,
  place,
} from '../../state/actions';
import { Montserrat } from '../../theme/fontFamily';

const LoadOrderUpdate = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { loadOrderId } = useParams();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadOrderData, setLoadOrderData] = useState(null);

  const {
    travel,
    loadingAction,
    success,
    register,
    details,
    measurementUnitsList,
    categoriesList,
    boardingModesList,
    basicTypeTransportUnitsList,
    placesList,
    markers
  } = props;

  useEffect(() => {
    measurementUnitsList();
    categoriesList();
    boardingModesList();
    basicTypeTransportUnitsList();
    placesList();
    if (!travel) {
      details(loadOrderId);
    }
  }, [
    measurementUnitsList,
    categoriesList,
    boardingModesList,
    basicTypeTransportUnitsList,
    placesList,
    loadOrderId,
    travel,
    details,
  ]);

  function onBack() {
    history.goBack();
  }

  /* const editarArrayTypeTransportUnit = (item) => {
    if (item.unit) {
      item.typeTransportUnitId = item.unit._id;
      item.name = item.unit.description;
      delete item.unit;
      return item;
    }
    return null;
  }; */

  function onConfirmationData(data) {
    console.log(data);
    setLoadOrderData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    let dataTemp = loadOrderData;
    dataTemp.checkPoints = markers;
    // register(dataTemp, operationId);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas actualizar la oportunidad?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Oportunidad actualizada exitosamente'}
            onOk={() => {
              props.offSuccess();
              history.goBack();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Editar oportunidad'}
            subtitle={{
              inicio: 'Operaciones',
              accion: 'Detalle de operación',
              accion2: 'Detalle de oportunidad',
              accion3: 'Editar oportunidad',
            }}
          />
          <Grid item xs={12} style={{ marginTop: 2 }}>
            <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
              Detalle de la oportunidad
            </C_TYPOGRAPHY>
          </Grid>

          <LoadOrderCreateForm onSubmit={onConfirmationData} onBack={onBack} markers={markers} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { travel, loadingAction, success } = state.loadOrder;
  const { markers } = state.maps;
  return { travel, loadingAction, success, markers };
};

const actionCreators = {
  register: loadOrder.loadOrderRegister,
  details: loadOrder.loadOrderDetails,
  offSuccess: loadOrder.offSuccess,
  measurementUnitsList: measurementUnit.measurementUnitsList,
  placesList: place.placesList,
  categoriesList: category.categoriesList,
  boardingModesList: boardingMode.boardingModesList,
  basicTypeTransportUnitsList: basicTypeTransportUnit.basicTypeTransportUnitsList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadOrderUpdate));
