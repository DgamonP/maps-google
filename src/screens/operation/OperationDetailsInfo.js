import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { InfoCell } from './components/InfoCell';
import { C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

const OperationDetailsInfo = (props) => {
  const { t, profile, operation } = props;

  const {
    code,
    row,
    company,
    description,
    usersOperatorProfile,
    comment,
    typeService,
    dispatchType,
    placeRoute,
  } = operation || {};

  return (
    <>
      <Grid style={{ marginTop: 30 }}>
        <InfoCell title={t('operation.code')} value={code} />
      </Grid>
      <Grid item xs={12}>
        <C_TYPOGRAPHY
          fontFamily={Montserrat.Light}
          variant={'body1'}
          color={'#707070'}
          fontSize={13}
        >
          {t('operation.details.create')}{' '}
          {row && moment.tz(row.createDate, profile.timeZone).format('DD/MM/YYYY HH:mm:ss')}{' '}
          {t('loadOrder.details.for')}{' '}
          {usersOperatorProfile &&
            usersOperatorProfile.firstName + ' ' + usersOperatorProfile.lastName}
        </C_TYPOGRAPHY>
      </Grid>
      <Grid style={{ marginTop: 20 }}>
        <InfoCell title={t('loadOrder.details.client')} value={company && company.name} />
      </Grid>
      <InfoCell title='DESCRIPCIÓN' value={description} />
      <InfoCell title='COMENTARIO' value={comment} />
      <InfoCell title='TIPO DE SERVICIO' value={typeService && typeService.name} />
      <InfoCell title='TIPO DE DESPACHO' value={dispatchType && dispatchType.dispatch} />
      <InfoCell title='RUTA' value={placeRoute && placeRoute.countryName} />
    </>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state.auth;
  const { operation } = state.operation;
  return { profile, operation };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperationDetailsInfo));
