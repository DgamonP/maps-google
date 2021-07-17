import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Delete, PowerSettingsNew, Visibility } from '@material-ui/icons';

import { StyledTableCell, StyledTableRow } from '../../theme/BaseStyles';

const ItemList = (props) => {
  const { item, list, details, activateDeactivate } = props;

  const id = item._id;
  const enable = item.enable;
  const row = Object.values(item);
  row.shift();
  if (typeof enable !== 'undefined') row.pop();
  // console.log('row', row);

  return (
    <StyledTableRow>
      {row.map((item) => (
        <StyledTableCell key={item} component='th' scope='row'>
          {item}
        </StyledTableCell>
      ))}
      {/* <StyledTableCell align='left'>
        <div>
          <C_BUTTON
            fullWidth={false}
            variant='outlined'
            onClick={() => {
              details(id, list);
            }}
            style={{ marginRight: 8 }}
          >
            Editar
          </C_BUTTON>
          {typeof enable !== 'undefined' && (
            <C_BUTTON
              fullWidth={false}
              variant='outlined'
              onClick={() => {
                activateDeactivate(id, { enable: !enable });
              }}
              color={'secondary'}
            >
              {enable ? 'Desactivar' : 'Activar'}
            </C_BUTTON>
          )}
        </div>
      </StyledTableCell> */}
      <StyledTableCell size='small'>
        <Grid container direction={'row'} justify='center'>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              details(id, list);
            }}
          >
            <IconButton size='small' title='Ver detalle'>
              <Visibility size='small' />
            </IconButton>
          </div>

          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              activateDeactivate(id, { enable: !enable });
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

export default ItemList;
