import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { StyledTableCell, StyledTableRow } from './styles';

const LoadOrderItem = (props) => {
  const history = useHistory();
  const { profile, dates, weightUnit, categoryLoad, route, travelstatus, loadingOrder } = props;
  const { loadingDate, deliveryDate } = dates || {};
  const { value, abbreviation } = weightUnit || {};
  const { origin, destination } = route || {};
  const { LoadingOrderStatus } = loadingOrder || {};

  let travelState = 'Creada';
  if (LoadingOrderStatus.length === 0) {
    travelState = travelstatus[travelstatus.length - 1].name;
  } else {
    travelState = LoadingOrderStatus[LoadingOrderStatus.length - 1].name;
  }

  const goToDetails = (row) => {
    history.push(`/loadOrder/show/${row._id}`);
  };

  return (
    <StyledTableRow
      style={{ cursor: 'pointer' }}
      onClick={() => {
        goToDetails(props);
      }}
    >
      <StyledTableCell component='th' scope='row'>
        {loadingDate && moment.tz(loadingDate, profile.timeZone).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {deliveryDate && moment.tz(deliveryDate, profile.timeZone).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell align='right'>
        {origin && origin.cityOrigin && origin.cityOrigin}
      </StyledTableCell>
      <StyledTableCell align='right'>
        {destination && destination.cityDestination && destination.cityDestination}
      </StyledTableCell>
      <StyledTableCell align='right'>{value && value + ' ' + abbreviation}</StyledTableCell>
      <StyledTableCell align='right'>{categoryLoad && categoryLoad.name}</StyledTableCell>
      <StyledTableCell align='right'>{travelState}</StyledTableCell>
    </StyledTableRow>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state.auth;
  return { profile };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(LoadOrderItem);
