import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import SvgColor from 'react-svg-color';

import { StyledTableCells } from './table_style';
import { Montserrat } from '../../theme/fontFamily';
import { C_TEXTFIELD } from '../input';

const IconFilter = () => {
  return (
    <span style={{ position: 'relative', top: 3, paddingLeft: 6 }}>
      <SvgColor svg={'/assets/svg/icon_filter.svg'} width={15} colors={['#172b4d']} />
    </span>
  );
};

const IconRight = () => {
  return (
    <div style={{ padding: 4, cursor: 'pointer' }} onClick={() => {}}>
      <SvgColor svg={'/assets/svg/arrow_right.svg'} width={6} colors={['#C9C9C9']} />
    </div>
  );
};

const C_TABLE = (props) => {
  const { columns, rows, children, onRow, onRequestSort, order, orderBy, search } = props;

  return (
    <>
      {search && (
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Grid item xs={12} sm={3} md={3}>
            <C_TEXTFIELD border={false} search={true} placeholder='Buscar ...' />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            style={{ borderRadius: 2, marginBottom: 30, maxHeight: 450 }}
          >
            <Table stickyHeader aria-label='sticky table'>
              <TableHead style={{ paddingTop: 5 }}>
                <TableRow>
                  {columns.map((value, index) => {
                    let alignTemp = 'left';
                    if (index === columns.length - 1) {
                      alignTemp = 'center';
                    }
                    return (
                      <StyledTableCells
                        size='small'
                        key={index}
                        align={alignTemp}
                        sortDirection={orderBy === value.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === value.id}
                          direction={orderBy === value.id ? order : 'asc'}
                          onClick={() => {
                            console.log('ordenar');
                          }}
                        >
                          {value.title}
                        </TableSortLabel>
                      </StyledTableCells>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>{children}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

C_TABLE.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array,

  children: PropTypes.node,

  search: PropTypes.bool,

  onRow: PropTypes.func,
  onRequestSort: PropTypes.func,

  order: PropTypes.string,
  orderBy: PropTypes.string,
};

C_TABLE.defaultProps = {
  columns: [],
  rows: [],

  order: '',
  orderBy: '',

  search: false,
};

export { C_TABLE };
