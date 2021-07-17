import React, { useState } from 'react';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';

import { C_BUTTON, C_CHECKBOX, C_POPOVER, C_TABLE, C_TEXTFIELD } from '../../../components';
import OperationItem from './OperationItem';
import { Montserrat } from '../../../theme/fontFamily';
import SvgColor from 'react-svg-color';

const OperationList = (props) => {
  const { companies, operations, operationStates, t } = props;

  const [visibleClient, setVisibleClient] = useState(null);
  const [visibleState, setVisibleState] = useState(null);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');

  const [selectedState, setSelectedState] = React.useState('');
  const [selectedClient, setSelectedClient] = React.useState('');

  function createColumn(title, id, numeric = false) {
    return { id, title };
  }

  function verific(name) {
    switch (name) {
      case 'date':
        return ['row', 'createDate'];

      case 'client':
        return ['company', 'name'];

      case 'operator':
        return ['usersOperatorProfile', 'firstName'];

      case 'service':
        return ['typeService', 'name'];

      case 'state':
        return ['operationStatusName'];

      default:
        return [name];
    }
  }

  function columns() {
    return [
      createColumn('Fecha', 'date'),
      createColumn(t('operation.code'), 'code'),
      createColumn('Descripción', 'description'),
      createColumn(t('operation.client'), 'client'),
      createColumn(t('operation.operator'), 'operator'),
      createColumn('Servicio', 'service'),
      createColumn(t('operation.state'), 'state'),
      // createColumn('Acción', 'action'),
    ];
  }

  const createSortHandler = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function updateRow() {
    // console.log(order)
    // console.log(orderBy)
    let array = operations;

    if (selectedState.toString().length > 0) {
      array = array.filter((item) => item.operationStatusName === selectedState);
    }
    if (selectedClient.toString().length > 0) {
      array = array.filter((item) => item.company.name === selectedClient);
    }

    return array.sort((a, b) => {
      let arrayOrder = verific(orderBy);
      let valueA = '';
      let valueB = '';

      if (arrayOrder.length > 1) {
        valueA = a[arrayOrder[0]][arrayOrder[1]];
        valueB = b[arrayOrder[0]][arrayOrder[1]];
      } else {
        valueA = a[arrayOrder[0]];
        valueB = b[arrayOrder[0]];
      }
      let result = 0;
      valueA = valueA.toString().split(' ').join('').toLowerCase();
      valueB = valueB.toString().split(' ').join('').toLowerCase();
      if (valueA > valueB) {
        result = 1;
      } else {
        if (valueA < valueB) {
          result = -1;
        }
      }
      return order === 'desc' ? -result : result;
    });
  }

  return (
    <>
      <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid container item xs={12} sm={3} style={{ marginBottom: 12, marginTop: 12 }}>
          <C_TEXTFIELD border={false} search={true} placeholder='Buscar ...' />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={9}
          justify='flex-end'
          style={{ marginBottom: 12, marginTop: 12 }}
        >
          <div>
            <C_BUTTON
              fullWidth={false}
              style={{
                marginRight: 6,
                padding: 3,
                paddingLeft: 6,
                paddingRight: 6,
                border: selectedClient === '' ? null : 'none',
                background: selectedClient === '' ? null : '#EC81051A',
              }}
              variant='outlined'
              color={'secondary'}
              onClick={(event) => setVisibleClient(event.currentTarget)}
              aria-describedby={'popover-cliente'}
            >
              {selectedClient === '' ? (
                'Cliente'
              ) : (
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                  <div style={{ position: 'relative', top: 1, paddingRight: 3 }}>
                    <SvgColor svg={'/assets/svg/Icon_filters.svg'} width={9} colors={['#EC8105']} />
                  </div>
                  <strong
                    style={{
                      fontFamily: Montserrat.Bold,
                      color: '#EC8105',
                      cursor: 'pointer',
                      fontSize: 10,
                      position: 'relative',
                      top: 4,
                    }}
                  >
                    {'Cliente: '}
                  </strong>{' '}
                  <label
                    style={{
                      color: '#242424',
                      paddingLeft: 3,
                      cursor: 'pointer',
                      fontSize: 10,
                      position: 'relative',
                      top: 4,
                    }}
                  >
                    {selectedClient}
                  </label>
                </div>
              )}
            </C_BUTTON>
            <C_POPOVER
              id={'popover-cliente'}
              visible={visibleClient}
              onClose={() => setVisibleClient(null)}
            >
              <Grid container direction={'column'} style={{ padding: 0 }}>
                <List component='nav' style={{ padding: 0 }}>
                  {companies.map((item, key) => {
                    return (
                      <ListItem
                        key={key}
                        button
                        selected={item.name === selectedClient}
                        style={{ padding: '2px 8px', borderRadius: 5, fontSize: 4 }}
                        onClick={() => {
                          setSelectedClient(item.name);
                          setVisibleClient(null);
                        }}
                      >
                        <ListItemText style={{ display: 'flex' }}>
                          <C_CHECKBOX
                            label={item.name}
                            checked={item.name === selectedClient}
                            onChange={() => {
                              setSelectedClient(item.name);
                              setVisibleClient(null);
                            }}
                          />
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </C_POPOVER>
          </div>

          <div>
            <C_BUTTON
              fullWidth={false}
              style={{ marginRight: 6, padding: 3, paddingLeft: 6, paddingRight: 6 }}
              variant='outlined'
              color={'secondary'}
            >
              Operador
            </C_BUTTON>
          </div>

          <div>
            <C_BUTTON
              fullWidth={false}
              variant='outlined'
              color={'secondary'}
              style={{
                marginRight: 6,
                padding: 3,
                paddingLeft: 6,
                paddingRight: 6,
                border: selectedState === '' ? null : 'none',
                background: selectedState === '' ? null : '#EC81051A',
              }}
              onClick={(event) => setVisibleState(event.currentTarget)}
            >
              {selectedState === '' ? (
                'Estado'
              ) : (
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                  <div style={{ position: 'relative', top: 1, paddingRight: 3 }}>
                    <SvgColor svg={'/assets/svg/Icon_filters.svg'} width={9} colors={['#EC8105']} />
                  </div>
                  <strong
                    style={{
                      fontFamily: Montserrat.Bold,
                      color: '#EC8105',
                      cursor: 'pointer',
                      fontSize: 10,
                      position: 'relative',
                      top: 4,
                    }}
                  >
                    {'Estado: '}
                  </strong>{' '}
                  <label
                    style={{
                      color: '#242424',
                      paddingLeft: 3,
                      cursor: 'pointer',
                      fontSize: 10,
                      position: 'relative',
                      top: 4,
                    }}
                  >
                    {selectedState}
                  </label>
                </div>
              )}
            </C_BUTTON>
            <C_POPOVER
              id={'popover-state'}
              visible={visibleState}
              onClose={() => setVisibleState(null)}
            >
              <Grid container direction={'column'} style={{ padding: 0 }}>
                <List component='nav' style={{ padding: 0 }}>
                  {operationStates.map((item, key) => {
                    return (
                      <ListItem
                        key={key}
                        button
                        selected={item.name === selectedState}
                        style={{ padding: '2px 8px', borderRadius: 5, fontSize: 4 }}
                        onClick={() => {
                          setSelectedState(item.name);
                          setVisibleState(null);
                        }}
                      >
                        <ListItemText style={{ display: 'flex' }}>
                          <C_CHECKBOX
                            label={item.name}
                            checked={item.name === selectedState}
                            onChange={() => {
                              setSelectedState(item.name);
                              setVisibleState(null);
                            }}
                          />
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </C_POPOVER>
          </div>
        </Grid>
      </Grid>
      <C_TABLE
        columns={columns()}
        order={order}
        orderBy={orderBy}
        onRequestSort={createSortHandler}
      >
        {updateRow().map((item, key) => (
          <OperationItem key={key} {...item} />
        ))}
      </C_TABLE>
    </>
  );
};

export default OperationList;
