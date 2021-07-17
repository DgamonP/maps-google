import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { Grid, IconButton } from '@material-ui/core';
import { Delete, PowerSettingsNew, Visibility } from '@material-ui/icons';
import { StyledTableCell, StyledTableRow } from '../../../../theme/BaseStyles';

const CompanyBodyItems = (props) => {
  const history = useHistory();

  const { rowElements, activateDeactivate, enable } = props;

  const rowElementsArray = Object.values(rowElements).splice(1);

  const handleDetails = (row) => {
    history.push(`/company/update/${row._id}`);
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
              handleDetails(rowElements);
            }}
          >
            <IconButton size='small' title='Ver detalle de la empresa'>
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
              <IconButton size='small' title='Desactivar empresa'>
                <Delete size='small' />
              </IconButton>
            ) : (
              <IconButton size='small' title='Activar empresa'>
                <PowerSettingsNew size='small' />
              </IconButton>
            )}
          </div>
        </Grid>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, null)(CompanyBodyItems);
