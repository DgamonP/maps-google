import React from 'react';
import { connect } from 'react-redux';

import { StyledTableCell, StyledTableRow } from '../../theme/BaseStyles';
import { Grid, IconButton } from '@material-ui/core';
import { KeyboardArrowRight, PersonAddDisabled } from '@material-ui/icons';

const TaskItems = (props) => {
  const { _id, name } = props;

  return (
    <StyledTableRow>
      <StyledTableCell>{_id && _id}</StyledTableCell>
      <StyledTableCell>{name && name}</StyledTableCell>
      <StyledTableCell size='small'>
        <Grid container direction={'row'}>
          <div style={{ padding: 4, cursor: 'pointer' }} onClick={() => {}}>
            <IconButton
              size='small'
              title='Desactivar Tarea'
              // onClick={onClick}
              // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <PersonAddDisabled size='small' style={{ fontSize: 18 }} />
            </IconButton>
          </div>
          <div style={{ padding: 4, cursor: 'pointer' }} onClick={() => {}}>
            <IconButton
              size='small'
              title='Editar tarea'
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

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, null)(TaskItems);
