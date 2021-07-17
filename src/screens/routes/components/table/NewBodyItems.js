import React from 'react';
import 'moment-timezone';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { StyledTableCell, StyledTableRow } from '../../../../theme/BaseStyles';
import { Grid, IconButton } from '@material-ui/core';
import { Delete, PowerSettingsNew } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
const NewBodyItems = (props) => {
  const history = useHistory();

  const { rowElements, activateDeactivate, enable } = props;

  const rowElementsArray = Object.values(rowElements).splice(1);

  const onPress = (row) => {
    history.push(`/routes/update/${row._id}`);
  };

  return (
    <StyledTableRow>
      {rowElementsArray.map((item, index) =>
        
          <StyledTableCell key={index}>{item}</StyledTableCell>
      )}
      <StyledTableCell size='small'>
        <Grid container direction={'row'} justify='center'>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPress(rowElements);
            }}
          >
            <IconButton size='small' title='Ir al detalle de la ruta'>
              <VisibilityIcon size='small' />
            </IconButton>
          </div>

          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              activateDeactivate(rowElements._id, { enable: !enable });
            }}
          >
            {
              <IconButton size='small' title='Desactivar ruta'>
                {enable ? <Delete size='small' /> : <PowerSettingsNew size='small' />}
              </IconButton>
            }
          </div>
        </Grid>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const mapStateToProps = (state) => {
  const { timeZone } = state.auth;
  return { timeZone };
};

export default connect(mapStateToProps, null)(NewBodyItems);
