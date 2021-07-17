import React from 'react';
// import {  C_FIELD } from '../../../components';
import { Field } from 'redux-form';
import { StyledTableCell, StyledTableRow } from '../../../theme/BaseStyles';

const TransportUnitItem = (props) => {
  const { _id, plate, name, ci } = props;

  return (
    <StyledTableRow>
      <StyledTableCell component='th' scope='row'>
        {ci}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {name}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {plate}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {/* <C_FIELD name={`loadingOrder.assignment.transportUnitId.${_id}`} checkbox /> */}
        <Field
          name={`loadingOrder.assignment.transportUnitId.${_id}`}
          component='input'
          type='checkbox'
          value={_id}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TransportUnitItem;
