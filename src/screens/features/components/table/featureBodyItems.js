import React from 'react';
import { useHistory } from 'react-router';

// import { StyledTableCell, StyledTableRow } from './styles';
import { StyledTableCell, StyledTableRow } from '../../../../theme/BaseStyles';
import { Grid, IconButton } from '@material-ui/core';
import { Delete, PowerSettingsNew, Visibility } from '@material-ui/icons';

const FeatureBodyItems = (props) => {
  const history = useHistory();

  const { rowElements, activateDesactivate, enable } = props;
  const rowElementsArray = Object.values(rowElements).splice(1);

  const onPress = (row) => {
    history.push(`/features/update/${row._id}`);
  };

  return (
    <StyledTableRow>
      {rowElementsArray.map((item, index) => (
        <StyledTableCell key={index}>{item}</StyledTableCell>
      ))}
      <StyledTableCell size='small'>
        <Grid container direction={'row'} justify='center'>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPress(rowElements);
            }}
          >
            <IconButton size='small' title='Ir al detalle de la característica'>
              <Visibility size='small' />
            </IconButton>
          </div>

          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              activateDesactivate(rowElements._id, { enable: !enable });
            }}
          >
            {enable ? (
              <IconButton size='small' title='Desactivar característica'>
                <Delete size='small' />
              </IconButton>
            ) : (
              <IconButton size='small' title='Activar característica'>
                <PowerSettingsNew size='small' />
              </IconButton>
            )}
          </div>
        </Grid>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FeatureBodyItems;
