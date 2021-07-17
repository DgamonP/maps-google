import React from 'react';
import { useHistory } from 'react-router';

import { StyledTableCell, StyledTableRow } from '../../../theme/BaseStyles';

const StagesTemplateItem = (props) => {
  const history = useHistory();
  const { dispatchType, typeServices, place } = props;

  const onPress = (dispatchTypeId, typeServiceId, placeId) => {
    history.push(`/stagesTemplate/show/${dispatchTypeId}/${typeServiceId}/${placeId}`);
  };

  return (
    <StyledTableRow
      hover
      onClick={() => {
        onPress(dispatchType._id, typeServices._id, place._id);
      }}
    >
      <StyledTableCell component='th' scope='row'>
        {dispatchType && dispatchType.name}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {typeServices && typeServices.name}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        {place && place.countryName}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default StagesTemplateItem;
