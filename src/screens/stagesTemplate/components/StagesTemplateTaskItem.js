import React from 'react';

import { StyledTableCell, StyledTableRow } from '../../../theme/BaseStyles';

export const StagesTemplateTaskItem = (props) => {
  const { name, validation, changeStage, viewCarrier, viewClient, allowFiles, pushNotification } =
    props;
  const { operator, carrier, client } = validation || {};

  return (
    <StyledTableRow hover>
      <StyledTableCell component='th' scope='row'>
        {name}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {changeStage ? 'si' : 'no'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {viewCarrier ? 'si' : 'no'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {viewClient ? 'si' : 'no'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {allowFiles ? 'si' : 'no'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {pushNotification ? 'si' : 'no'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {operator ? 'si' : 'no'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {carrier ? 'si' : 'no'}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {client ? 'si' : 'no'}
      </StyledTableCell>
    </StyledTableRow>
  );
};
