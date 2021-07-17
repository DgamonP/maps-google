import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import Map from '../../components/Map';
import { StyleContext } from '../../theme/BaseStyles';
import { loadOrder, postulation, transportUnit } from '../../state/actions';
import {
  C_BUTTON,
  C_DIALOG,
  C_LOADING,
  C_SUCCESS,
  C_TYPOGRAPHY,
  FormTitle,
} from '../../components';

import LoadOrderTasks from './LoadOrderTasks';
import LoadOrderDetailsInfo from './LoadOrderDetailsInfo';
import LoadOrderDetailsState from './LoadOrderDetailsState';
import PostulationList from '../postulation/components/PostulationList';
import LoadOrderActions from './LoadOrderActions';
import LoadOrderDetailsTransportUnit from './LoadOrderDetailsTransportUnit';

const LoadOrderDetails = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { loadOrderId } = useParams();
  const {
    t,
    travel,
    postulation,
    loadingAction,
    success,
    checkpoints,
    profile,
    details,
    liquidate,
    offSuccess,
  } = props;
  const { loadingOrder, stages } = travel || {};

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadOrderData, setLoadOrderData] = useState(null);

  useEffect(() => {
    details(loadOrderId);
  }, [loadOrderId, details]);

  const onBack = () => {
    history.goBack();
  };

  function onConfirmationData(travelId) {
    // console.log(data);
    setLoadOrderData(travelId);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    const data = loadOrderData;
    liquidate(data);
  };

  function componentPostulation() {
    if (loadingOrder && loadingOrder.assignment && loadingOrder.assignment.transportUnitId) {
      return null;
    } else {
      return (
        <Grid container direction={'row'}>
          <PostulationList />
        </Grid>
      );
    }
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas liquidar la orden de carga?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Orden de carga liquidada exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={stages ? t('loadOrder.details.title') : 'Detalle de la oportunidad'}
            subtitle={{
              inicio: t('operation.operation'),
              accion: t('operation.details.title'),
              title: t('loadOrder.details.title'),
            }}
          />

          <Grid container>
            <Grid item sm={6} xs={12}>
              <LoadOrderDetailsInfo />

              <Grid container direction='row' spacing={1} style={{ marginTop: 15 }}>
                <Grid item sm={6} xs={12}>
                  <C_BUTTON
                    fullWidth={false}
                    variant='outlined'
                    onClick={() => history.push(`/loadOrder/update/${loadOrderId}`)}
                  >
                    {stages ? t('loadOrder.details.edit') : 'Editar oportunidad'}
                  </C_BUTTON>
                </Grid>
                {loadingOrder && loadingOrder.LoadingOrderStatus.length === 3 && (
                  <Grid item sm={6} xs={12}>
                    <C_BUTTON
                      fullWidth={false}
                      variant='outlined'
                      color={'secondary'}
                      style={{ marginRight: 6 }}
                      onClick={() => {
                        onConfirmationData(loadOrderId);
                      }}
                    >
                      Liquidar orden de carga
                    </C_BUTTON>
                  </Grid>
                )}
              </Grid>

              {loadingOrder && loadingOrder.assignment.transportUnitId && (
                <LoadOrderDetailsTransportUnit />
              )}
            </Grid>

            <Grid
              container
              item
              sm={6}
              xs={12}
              direction='column'
              style={{ marginTop: 10, paddingRight: 10 }}
            >
              <Map />
              {checkpoints.length > 0 && (
                <C_TYPOGRAPHY fontSize={14} style={{ marginTop: 4 }}>
                  Repotado última vez:{' '}
                  {moment
                    .tz(checkpoints[checkpoints.length - 1].dateTime, profile.timeZone)
                    .format('DD/MM/YYYY hh:mm:ss')}
                </C_TYPOGRAPHY>
              )}
              <LoadOrderDetailsState />
            </Grid>
          </Grid>

          {stages ? (
            /* seria LoadOrderStages */
            <LoadOrderTasks />
          ) : (
            <>
              {postulation && (
                <Grid container direction='row' style={{ marginTop: 15 }}>
                  <C_BUTTON
                    fullWidth={false}
                    variant='outlined'
                    onClick={() => history.push(`/travel/${loadOrderId}/loadingOrder/create`)}
                  >
                    Crear orden de carga
                  </C_BUTTON>
                </Grid>
              )}
              {/* <LoadOrderActions /> */}
              {componentPostulation()}
            </>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loadingAction, success, travel, checkpoints } = state.loadOrder;
  const { postulation } = state.postulation;
  const { profile } = state.auth;
  return { travel, postulation, loadingAction, success, checkpoints, profile };
};

const actionCreators = {
  details: loadOrder.loadOrderDetails,
  liquidate: loadOrder.loadOrderLiquidate,
  offSuccess: loadOrder.offSuccess,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadOrderDetails));
