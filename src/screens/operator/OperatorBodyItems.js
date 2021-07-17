import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { StyledTableCell, StyledTableRow } from '../../theme/BaseStyles';
import { Grid, IconButton } from '@material-ui/core';
import { AddCircle, KeyboardArrowRight, PersonAdd, PersonAddDisabled } from '@material-ui/icons';
import { operator } from '../../state/actions';

const OperatorBodyItems = (props) => {
  const history = useHistory();
  const { _id, auth, profile, account, userId, details, activateDeactivate } = props;
  const { firstName, lastName, documentId } = profile || {};

  const onPress = () => {
    history.push(`/operator/update/${_id}`);
  };

  const onPressRoles = () => {
    // details(operatorId, []);
    history.push(`/operator/roles/${_id}`);
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{firstName && firstName}</StyledTableCell>
      <StyledTableCell>{lastName && lastName}</StyledTableCell>
      <StyledTableCell>{documentId && documentId}</StyledTableCell>
      <StyledTableCell>{auth && auth.email && auth.email}</StyledTableCell>
      {/* <StyledTableCell>{companyId && companyId}</StyledTableCell> */}
      {/* <StyledTableCell>{address && address.country && address.country}</StyledTableCell> */}
      <StyledTableCell size='small'>
        <Grid container direction={'row'}>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPress();
            }}
          >
            <IconButton size='small' title='Ir al detalle del operador'>
              <KeyboardArrowRight size='small' />
            </IconButton>
          </div>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPressRoles();
            }}
          >
            <IconButton
              size='small'
              title='Ir a roles del operador'
              // onClick={onClick}
              // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <AddCircle size='small' style={{ fontSize: 18 }} />
            </IconButton>
          </div>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              activateDeactivate(_id, { enable: !account.enable }, userId);
            }}
          >
            {account && account.enable ? (
              <IconButton size='small' title='Desactivar operador'>
                <PersonAddDisabled size='small' />
              </IconButton>
            ) : (
              <IconButton size='small' title='Activar operador'>
                <PersonAdd size='small' />
              </IconButton>
            )}
          </div>
        </Grid>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    details: (operatorId, operators) => dispatch(operator.operatorDetails(operatorId, operators)),
  };
};

export default connect(null, mapDispatchToProps)(OperatorBodyItems);
