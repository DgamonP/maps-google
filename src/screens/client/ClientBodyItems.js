
import React from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { StyledTableCell, StyledTableRow } from './styles';
import { Grid, IconButton } from '@material-ui/core';
import { AddCircle, KeyboardArrowRight, PersonAddDisabled } from '@material-ui/icons';

const ClientBodyItems = (props) => {
  const history = useHistory();
  const { id, firstName, lastName, documentId, birthDate, email, companyId, country } = props;

  const onPress = (row) => {
    history.push(`/clients/edit/${row.id}`);
  };
  const onPressRoles = (row) => {
    history.push(`/clients/roles/${row.id}`);
  };
  //   const onPress = (row) => {
  //     history.push(`/operator/edit/${row.id}`);
  //   };
  return (
    <StyledTableRow
    //   onClick={() => {
    //     onPress(props);
    //   }}
    >
      <StyledTableCell>{firstName}</StyledTableCell>
      {/* <StyledTableCell>{id}</StyledTableCell> */}
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{documentId}</StyledTableCell>
      <StyledTableCell>{birthDate}</StyledTableCell>
      <StyledTableCell>{email}</StyledTableCell>
      <StyledTableCell>{companyId}</StyledTableCell>
      <StyledTableCell>{country}</StyledTableCell>
      <StyledTableCell size='small'>
        <Grid container direction={'row'}>
          <div style={{ padding: 4, cursor: 'pointer' }} onClick={() => {}}>
            <IconButton
              size='small'
              title='Desactivar Operador'
              // onClick={onClick}
              // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <PersonAddDisabled size='small' style={{ fontSize: 18, }} />
            </IconButton>
          </div>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPressRoles(props);
            }}
          >
            <IconButton
              size='small'
              title='Roles Operador'
              // onClick={onClick}
              // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <AddCircle size='small' style={{ fontSize: 18, }} />
            </IconButton>
          </div>
          <div
            style={{ padding: 4, cursor: 'pointer' }}
            onClick={() => {
              onPress(props);
            }}
          >
            <IconButton
              size='small'
              title='Ir al detalle del operador'
              // onClick={onClick}
              // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <KeyboardArrowRight size='small' style={{ fontSize: 18, }} />
            </IconButton>
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

export default connect(mapStateToProps, null)(ClientBodyItems);
