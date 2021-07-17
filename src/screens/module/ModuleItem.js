import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { StyledTableCell, StyledTableRow } from '../../theme/BaseStyles';
import { Grid, IconButton } from '@material-ui/core';
import { KeyboardArrowRight, PersonAddDisabled } from '@material-ui/icons';

const ModuleItem = (props) => {
  const history = useHistory();
  const { _id, name } = props;

  const onPress = (row) => {
    history.push(`/module/edit/${row.id}`);
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{_id}</StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell size='small'>
        <Grid container direction={'row'}>
          <div style={{ padding: 4, cursor: 'pointer' }} onClick={() => {}}>
            <IconButton size='small' title='Desactivar modulo'>
              <PersonAddDisabled size='small' style={{ fontSize: 18 }} />
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
              title='Editar operador'
              // onClick={onClick}
              // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <KeyboardArrowRight size='small' style={{ fontSize: 18 }} />
            </IconButton>
          </div>
        </Grid>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, null)(ModuleItem);
