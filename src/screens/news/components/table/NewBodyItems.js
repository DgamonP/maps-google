import React from 'react';
import { useHistory } from 'react-router';
import { Grid, IconButton } from '@material-ui/core';
import { Delete, PowerSettingsNew, Visibility } from '@material-ui/icons';

import { StyledTableCell, StyledTableRow } from '../../../../theme/BaseStyles';

const NewBodyItems = (props) => {
  const history = useHistory();
  const { rowElements, activateDeactivate, enable } = props;

  const rowElementsArray = Object.values(rowElements).splice(1);

  const onPress = (row) => {
    history.push(`/news/update/${row._id}`);
  };

  return (
    <StyledTableRow>
      {rowElementsArray.map((item, index) =>
        rowElementsArray.length !== index + 1 ? (
          <StyledTableCell key={index}>{item}</StyledTableCell>
        ) : (
          <StyledTableCell key={index}>
            <a href={item} target='_blank'>
              Enlace
            </a>
          </StyledTableCell>
        )
      )}
      <StyledTableCell size='small'>
        <Grid container direction={'row'} justify='center'>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPress(rowElements);
            }}
          >
            <IconButton size='small' title='Ir al detalle de la noticia'>
              <Visibility size='small' />
            </IconButton>
          </div>

          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              activateDeactivate(rowElements._id, { enable: !enable });
            }}
          >
            {enable ? (
              <IconButton size='small' title='Desactivar'>
                <Delete size='small' />
              </IconButton>
            ) : (
              <IconButton size='small' title='Activar'>
                <PowerSettingsNew size='small' />
              </IconButton>
            )}
          </div>
        </Grid>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default NewBodyItems;
