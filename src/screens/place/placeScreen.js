import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_TYPOGRAPHY, C_BUTTON, C_TABLE } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { place } from '../../state/actions/place';
import PlaceBodyItems from './components/table/placeBodyItems';

const Places = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { places, loadingAction, list, activateDeactivate } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(id, title) {
    return { id, title };
  }

  const columns = () => [createColumn('name', 'Nombre'), createColumn('action', 'Acción')];

  function rows() {
    let dataList = [];
    if (places.length > 0) {
      dataList = places.map((item) => {
        return {
          _id: item._id,
          name: item.countryName,
        };
      });
    }
    return dataList;
  }

  function onCreate() {
    history.push('/places/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loadingAction} />

        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              Paises
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
              + Crear País
            </C_BUTTON>
          </Grid>
        </Grid>
        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {places.length > 0 && (
            <C_TABLE search={true} columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <PlaceBodyItems
                    key={item._id}
                    rowElements={item}
                    activateDeactivate={activateDeactivate}
                    enable={places[key].account.enable}
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
  const { places, loadingAction } = state.place;
  return { places, loadingAction };
};

const actionCreators = {
  list: place.placesList,
  activateDeactivate: place.placeActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(Places));
