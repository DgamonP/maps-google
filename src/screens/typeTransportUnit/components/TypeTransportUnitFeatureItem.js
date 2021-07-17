import React from 'react';

import { StyledTableCell, StyledTableRow } from '../../../theme/BaseStyles';

export const TypeTransportUnitFeatureItem = (props) => {
  const { name, valueQualitative, valueQuantitative } = props;

  return (
    <StyledTableRow hover>
      <StyledTableCell component='th' scope='row'>
        {name}
      </StyledTableCell>
      {valueQualitative ? (
        <StyledTableCell component='th' scope='row'>
          {valueQualitative}
        </StyledTableCell>
      ) : (
        <StyledTableCell component='th' scope='row'>
          {valueQuantitative}
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};
