import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import {
  C_CHECKBOX,
  C_DIALOG,
  C_LOADING,
  C_SUCCESS,
  C_TYPOGRAPHY,
  FormTitle,
} from '../../components';
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

const LoadOrderCreate = (props) => {
  const classes = React.useContext(StyleContext);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadOrderData, setLoadOrderData] = useState(null);
  const [withCarrierAssign, setWithCarrierAssign] = useState(false);

  const history = useHistory();
  const { operationId } = useParams();
  const {
    loadingAction,
    success,
    loadingSearch,
    register,
    measurementUnitsList,
    categoriesList,
    boardingModesList,
    basicTypeTransportUnitsList,
    placesList,
    loadingOrderCreateDirect,
    markers,
  } = props;

  useEffect(() => {
    measurementUnitsList();
    categoriesList();
    boardingModesList();
    basicTypeTransportUnitsList();
    placesList();
  }, [
    measurementUnitsList,
    categoriesList,
    boardingModesList,
    basicTypeTransportUnitsList,
    placesList,
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
    if (withCarrierAssign) {
      loadingOrderCreateDirect(
        dataTemp,
        operationId,
        loadOrderData.loadingOrder.assignment.transportUnitId
      );
    } else {
      register(dataTemp, operationId);
    }
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction || loadingSearch} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas crear la oportunidad?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Oportunidad creada exitosamente'}
            onOk={() => {
              props.offSuccess();
              history.goBack();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Crear oportunidad'}
            subtitle={{
              inicio: 'Operaciones',
              accion: 'Detalle de operación',
              title: 'Crear oportunidad',
            }}
          />
          <Grid item xs={12} style={{ marginTop: 2 }}>
            <C_CHECKBOX
              label={'Crear orden de carga directa'}
              checked={withCarrierAssign}
              onChange={() => setWithCarrierAssign(!withCarrierAssign)}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 2 }}>
            <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
              Detalle de la oportunidad
            </C_TYPOGRAPHY>
          </Grid>

          <LoadOrderCreateForm
            onSubmit={onConfirmationData}
            onBack={onBack}
            markers={markers}
            withCarrierAssign={withCarrierAssign}
          />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loadingAction, success } = state.loadOrder;
  const { loading: loadingSearch } = state.transportUnit;
  const { markers } = state.maps;
  return { loadingAction, success, loadingSearch, markers };
};

const actionCreators = {
  register: loadOrder.loadOrderRegister,
  offSuccess: loadOrder.offSuccess,
  measurementUnitsList: measurementUnit.measurementUnitsList,
  placesList: place.placesList,
  categoriesList: category.categoriesList,
  boardingModesList: boardingMode.boardingModesList,
  basicTypeTransportUnitsList: basicTypeTransportUnit.basicTypeTransportUnitsList,
  loadingOrderCreateDirect: loadOrder.loadingOrderCreateDirect,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadOrderCreate));
