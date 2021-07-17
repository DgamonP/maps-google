import React from 'react';

import moment from 'moment';
import 'moment-timezone';

import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { StyledTableCell, StyledTableRow } from '../styles';
import { Montserrat } from '../../../theme/fontFamily';

const OperationItem = (props) => {
  const history = useHistory();
  const { profile, code, description, row, typeService, company, usersOperatorProfile } = props;

  const onPress = (row) => {
    history.push(`/operation/show/${row._id}`);
  };

  let style = { cursor: 'pointer' };
  if (props.operationStatusName === 'Planificada') {
    style = Object.assign(style, {
      fontFamily: Montserrat.Bold,
      color: 'black',
    });
  }
  if (props.operationStatusName === 'En Curso') {
    style = Object.assign(style, {
      fontFamily: Montserrat.Bold,
      color: '#5189CB',
    });
  }
  if (props.operationStatusName === 'Por Liquidar') {
    style = Object.assign(style, {
      fontFamily: Montserrat.Bold,
      color: '#D82E41',
      background: '#D82E4115',
    });
  }
  if (props.operationStatusName === 'Liquidado') {
    style = Object.assign(style, {
      fontFamily: Montserrat.Bold,
      color: '#51CB89',
      background: '#51CB891F',
    });
  }
  if (props.operationStatusName === 'Cancelada') {
    style = Object.assign(style, {
      fontFamily: Montserrat.Bold,
      color: '#707070',
    });
  }

  return (
    <StyledTableRow
      hover
      onClick={() => {
        onPress(props);
      }}
      style={style}
    >
      <StyledTableCell component='th' scope='row'>
        {moment.tz(row.createDate, profile.timeZone).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell align='left'>{code}</StyledTableCell>
      <StyledTableCell align='left'>{description}</StyledTableCell>
      <StyledTableCell align='left'>{company.name && company.name}</StyledTableCell>
      <StyledTableCell align='left'>
        {usersOperatorProfile.firstName + ' ' + usersOperatorProfile.lastName}
      </StyledTableCell>
      <StyledTableCell align='left'>{typeService.name}</StyledTableCell>
      <StyledTableCell align='left' style={style}>
        {props.operationStatusName}
      </StyledTableCell>
    </StyledTableRow>
  );
};

const mapStateToProps = (state) => {
  const { profile } = state.auth;
  return { profile };
};

export default connect(mapStateToProps, null)(OperationItem);
