import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';

import { C_INFOCELLS, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

const LoadOrderDetailsInfo = (props) => {
  const { t, profile, travel } = props;

  const { row, route, freightValues, loadingOrder } = travel || {};
  const { origin, destination } = route || {};

  return (
    <Grid container direction='column'>
      {/* <Grid item xs={12} style={{ marginTop: 5, marginBottom: 2 }}>
        <C_TYPOGRAPHY display='inline' fontFamily={Montserrat.Light} fontSize={16}>
          {t('loadOrder.details.code')}:
        </C_TYPOGRAPHY>
        <C_TYPOGRAPHY
          style={{ paddingLeft: 5 }}
          fontSize={16}
          display='inline'
          fontFamily={Montserrat.Bold}
        >
          {'code'}
        </C_TYPOGRAPHY>
      </Grid> */}

      <Grid item xs={12} style={{ marginTop: 15 }}>
        <C_TYPOGRAPHY fontFamily={Montserrat.SemiBold} variant={'body1'} fontSize={13}>
          {t('loadOrder.details.create')}{' '}
          {row && moment.tz(row.createDate, profile.timeZone).format('DD/MM/YYYY HH:mm:ss')}
        </C_TYPOGRAPHY>
      </Grid>

      {/* <Grid item xs={12} style={{ marginTop: 15, marginBottom: 15 }}>
        <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={16}>
          {t('loadOrder.details.subtitle')}
        </C_TYPOGRAPHY>
      </Grid> */}

      <Grid container direction={'row'} style={{ marginTop: 15, marginBottom: 10 }}>
        <C_INFOCELLS
          title={t('loadOrder.details.origin')}
          value={origin && origin.cityOrigin}
          sm={4}
        />
        <C_INFOCELLS
          title={t('loadOrder.details.destination')}
          value={destination && destination.cityDestination}
          sm={8}
        />
      </Grid>
      <Grid container direction={'row'}>
        <C_INFOCELLS
          title={t('loadOrder.details.customerFreight')}
          value={
            freightValues && (
              <label>
                {/* $us{' '} */}
                <span style={{ color: '#EC8105' }}>{freightValues.clientFreight.freightValue}</span>
              </label>
            )
          }
        />
        <C_INFOCELLS
          title={t('loadOrder.details.cost')}
          value={
            <label>
              {/* $us {' '} */}
              <span style={{ color: '#EC8105' }}>
                {loadingOrder &&
                  loadingOrder.carrierFreight &&
                  loadingOrder.carrierFreight.freightValue}
              </span>
            </label>
          }
        />
        {/* <C_INFOCELLS title={t('loadOrder.details.profit')} value={'5%'} /> */}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state.auth;
  const { travel } = state.loadOrder;
  return { profile, travel };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadOrderDetailsInfo));
