import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import { C_DIALOG, C_LOADING, C_SUCCESS, FormTitle } from '../../components';
import { loadOrder, measurementUnit, postulation } from '../../state/actions';
import LoadingOrderCreateForm from './components/LoadingOrderCreateForm';

const LoadingOrderCreate = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { travelId } = useParams();
  const {
    postulation,
    offSuccess,
    loadingAction,
    loadingOrderCreate,
    postulationConfirmed,
    measurementUnitsList,
    success,
  } = props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadOrderData, setLoadOrderData] = useState(null);

  useEffect(() => {
    measurementUnitsList();
    postulationConfirmed(travelId);
  }, [travelId, postulationConfirmed, measurementUnitsList]);

  function onBack() {
    history.goBack();
  }

  function onConfirmationData(data) {
    console.log(data);
    setLoadOrderData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    loadingOrderCreate(travelId, loadOrderData, postulation.transportUnitId);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas crear la orden de carga?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Orden de carga creada exitosamente'}
            onOk={() => {
              offSuccess();
              history.goBack();
            }}
          />
        </>
        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Crear orden de carga'}
            subtitle={{
              inicio: 'Operaciones',
              accion: 'Detalle de operación',
              title: 'Oportunidad',
              title1: 'Detalle de la Oportunidad',
              title2: 'Crear orden de carga',
            }}
          />
          <LoadingOrderCreateForm onSubmit={onConfirmationData} onBack={onBack} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loadingAction, success } = state.loadOrder;
  const { postulation } = state.postulation;
  return { loadingAction, success, postulation };
};

const actionCreators = {
  loadingOrderCreate: loadOrder.loadingOrderCreate,
  postulationConfirmed: postulation.postulationConfirmedDetails,
  offSuccess: loadOrder.offSuccess,
  measurementUnitsList: measurementUnit.measurementUnitsList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadingOrderCreate));
