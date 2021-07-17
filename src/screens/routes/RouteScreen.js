import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_TYPOGRAPHY, C_BUTTON, C_TABLE } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { routesAction } from '../../state/actions/routes';
import NewBodyItems from './components/table/NewBodyItems';

const RouteScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { loading, routes, list, activateDeactivate } = props;

  if (!routes || (routes.length == 0)) {
    list();
  }
      

  function createColumn(title, id) {
    return { id, title };
  }

  const columns = () => [
    createColumn('País de origen', 'countryOrigin'),
    createColumn('Ciudad de origen', 'cityOrigin'),
    createColumn('País de destino', 'countryDestination'),
    createColumn('Ciudad de destino', 'cityDestination'),
    createColumn('Acción', 'action'),
  ];

  function rows() {
    if (routes.length > 0) {
      return routes.map((item) => {
        return {
          _id: item._id,
          countryOrigin: item.origin.countryOrigin,
          cityOrigin: item.origin.cityOrigin,
          countryDestination: item.destination.countryDestination,
          cityDestination: item.destination.cityDestination,
        };
      });
    } else {
      return [];
    }
  }

  function onCreate() {
    history.push('routes/create');
  }


  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loading || routes.length === 0} />

        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              Rutas
            </C_TYPOGRAPHY>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <C_BUTTON
              fullWidth={false}
              fontSize={11}
              onClick={onCreate}
              variant={'text'}
              style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
              fontFamily={Montserrat.SemiBold}
            >
              + Crear ruta
            </C_BUTTON>
          </Grid>
        </Grid>
        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {routes.length > 0 && (
            <C_TABLE search={true} columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <NewBodyItems
                    key={item._id}
                    rowElements={item}
                    activateDeactivate={activateDeactivate}
                    enable={routes[key].account.enable}
                  />
                );
              })}
            </C_TABLE>
          )}
        </Paper>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { routes, loading } = state.routes;
  return { routes, loading };
};

const actionCreators = {
  list: routesAction.routesList,
  activateDeactivate: routesAction.routesActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(RouteScreen));
