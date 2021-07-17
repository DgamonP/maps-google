import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Delete, PowerSettingsNew, Visibility } from '@material-ui/icons';

import { typeTransportUnit } from '../../../state/actions';
import { StyledTableCell, StyledTableRow } from '../../../theme/BaseStyles';

const TypeTransportUnitItem = (props) => {
  const history = useHistory();
  const { _id, account, description, activateDeactivate } = props;

  const onPress = (id) => {
    history.push(`/typeTransportUnit/show/${id}`);
  };

  return (
    <StyledTableRow>
      <StyledTableCell component='th' scope='row'>
        {description}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        <Grid container direction={'row'} justify='center'>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPress(_id);
            }}
          >
            <IconButton size='small' title='Ver detalle'>
              <Visibility size='small' />
            </IconButton>
          </div>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              activateDeactivate(_id, { enable: !account.enable });
            }}
          >
            {account.enable ? (
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

const mapStateToProps = () => {
  return {};
};

const actionCreators = {
  activateDeactivate: typeTransportUnit.typeTransportUnitActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(TypeTransportUnitItem);
