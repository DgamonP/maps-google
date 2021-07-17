import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_TYPOGRAPHY, C_BUTTON, C_TABLE } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { city } from '../../state/actions';
import CityItem from './components/CityItem';

const CityScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { cities, loadingAction, list, activateDeactivate } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(id, title) {
    return { id, title };
  }

  const columns = () => [
    createColumn('name', 'Nombre'),
    createColumn('stateName', 'Departamento'),
    createColumn('countryName', 'País'),
    createColumn('action', 'Acción'),
  ];

  function rows() {
    let dataList = [];
    if (cities.length > 0) {
      dataList = cities.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          stateName: item.statesName,
          countryName: item.countryName,
        };
      });
    }
    return dataList;
  }

  function onCreate() {
    history.push('/city/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loadingAction} />

        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              Ciudades
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
              // textTransform={false}
            >
              + Crear Ciudad
            </C_BUTTON>
          </Grid>
        </Grid>
        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {cities.length > 0 && (
            <C_TABLE search={true} columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <CityItem
                    key={item._id}
                    rowElements={item}
                    activateDeactivate={activateDeactivate}
                    enable={cities[key].account.enable}
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
  const { cities, loadingAction } = state.city;
  return { cities, loadingAction };
};

const actionCreators = {
  list: city.citiesList,
  activateDeactivate: city.cityActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(CityScreen));
