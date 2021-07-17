import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import LoadOrderItem from './LoadOrderItem';
import { loadOrder } from '../../state/actions';
import { C_BUTTON, C_TABLE, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

const LoadOrderScreen = (props) => {
  const { operationId } = useParams();
  const history = useHistory();
  const { t, loadOrders, list } = props;

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('loadingDate');

  useEffect(() => {
    list(operationId);
  }, [list, operationId]);

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    return [
      createColumn('Fecha Carga', 'loadingDate'),
      createColumn('Fecha Entrega', 'deliveryDate'),
      createColumn('Origen', 'cityOrigin'),
      createColumn('Destino', 'cityDestination'),
      createColumn('Peso', 'weight'),
      createColumn('Categoría', 'category'),
      createColumn(t('loadOrder.state'), 'state'),
    ];
  }

  const createSortHandler = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function verific(name) {
    switch (name) {
      case 'loadingDate':
        return ['dates', 'loadingDate'];

      case 'deliveryDate':
        return ['dates', 'deliveryDate'];

      case 'cityOrigin':
        return ['route', 'origin', 'cityOrigin'];

      case 'cityDestination':
        return ['route', 'destination', 'cityDestination'];

      case 'weight':
        return ['weightUnit', 'value'];

      case 'category':
        return ['categoryLoad', 'name'];

      // case "state":
      //     return ["categoryLoad", "name"];

      default:
        return [name];
    }
  }

  function updateRow() {
    let array = loadOrders;

    return array.sort((a, b) => {
      if (orderBy == 'state') return;

      let arrayOrder = verific(orderBy);
      let valueA = '';
      let valueB = '';

      if (arrayOrder.length > 2) {
        valueA = a[arrayOrder[0]][arrayOrder[1]][arrayOrder[2]];
        valueB = b[arrayOrder[0]][arrayOrder[1]][arrayOrder[2]];
      } else {
        if (arrayOrder.length > 1) {
          valueA = a[arrayOrder[0]][arrayOrder[1]];
          valueB = b[arrayOrder[0]][arrayOrder[1]];
        } else {
          valueA = a[arrayOrder[0]];
          valueB = b[arrayOrder[0]];
        }
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
      <Grid container item xs={12} style={{ marginTop: 10 }}>
        <C_TYPOGRAPHY variant='h4' fontFamily={Montserrat.Bold} fontSize={20}>
          Viajes
        </C_TYPOGRAPHY>
      </Grid>
      <Grid container item xs={12} style={{ marginTop: 10 }}>
        <C_BUTTON
          fullWidth={false}
          fontSize={10}
          variant={'text'}
          style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
          fontFamily={Montserrat.Bold}
          onClick={() => history.push(`/operation/${operationId}/loadOrder/create`)}
        >
          + Crear oportunidad
        </C_BUTTON>
      </Grid>

      <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
        <C_TABLE
          columns={columns()}
          order={order}
          orderBy={orderBy}
          onRequestSort={createSortHandler}
        >
          {loadOrders && updateRow().map((item) => <LoadOrderItem key={item._id} {...item} />)}
        </C_TABLE>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const { loadOrders } = state.loadOrder;
  return { loadOrders };
};

const actionCreators = {
  list: loadOrder.loadOrdersList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadOrderScreen));
