import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import SvgColor from 'react-svg-color';
import { Card, CardHeader, CircularProgress, Grid } from '@material-ui/core';

import { C_TYPOGRAPHY } from '../../components';
import { operation } from '../../state/actions';

const HomeInfo = (props) => {
  const { userId, dashboard, operationDashboard } = props;
  const { operationsActive, travelActive, travelToPay, tasksPending } = dashboard || {};

  useEffect(() => {
    operationDashboard(userId);
  }, [userId, operationDashboard]);

  const CardQuantity = (quantity, title) => (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader
          title={
            quantity || quantity === 0 ? (
              <C_TYPOGRAPHY variant='h1' fontSize={35} align='center'>
                {quantity}
              </C_TYPOGRAPHY>
            ) : (
              <Grid container justify='center' alignItems='center' style={{ marginBottom: 5 }}>
                <CircularProgress color='secondary' size={35} />
              </Grid>
            )
          }
          subheader={
            <C_TYPOGRAPHY variant='h6' color='#959696' fontSize={10} align='center'>
              {title}
            </C_TYPOGRAPHY>
          }
          avatar={
            <div style={{ position: 'relative', left: 15 }}>
              <SvgColor svg={'/assets/svg/icon_activity.svg'} width={24} colors={['#FA8905']} />
            </div>
          }
        />
      </Card>
    </Grid>
  );

  return (
    <Grid container spacing={3} style={{ marginTop: 5 }}>
      {CardQuantity(operationsActive, 'Operaciones activas')}
      {CardQuantity(travelActive, 'Ordenes de carga activas')}
      {CardQuantity(travelToPay, 'Ordenes de carga pendientes de pago')}
      {CardQuantity(tasksPending, 'Tareas pendientes')}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { userId } = state.auth;
  const { dashboard } = state.operation;
  return { userId, dashboard };
};

const actionCreators = {
  operationDashboard: operation.operationDashboard,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(HomeInfo));
