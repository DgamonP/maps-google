import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_BUTTON, C_TABLE, FormTitle } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { feature } from '../../state/actions/features';
import FeatureBodyItems from './components/table/featureBodyItems';

const Features = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { features, loadingAction, list, activateDesactivate } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(id, title) {
    return { id, title };
  }

  const columns = () => [
    createColumn('name', 'Característica'),
    createColumn('type', 'Tipo'),
    createColumn('action', 'Acción'),
  ];

  function rows() {
    let dataList = [];
    if (features.length > 0) {
      dataList = features.map((item) => {
        let type = 'Cuantitativo';
        if (item.Qualitative) type = 'Cualitativo';
        return {
          _id: item._id /* de primero */,
          name: item.name,
          type,
        };
      });
    }
    return dataList;
  }

  function onCreate() {
    history.push('/features/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loadingAction} />
        <Grid container direction={'column'}>
          <FormTitle
            title={'Características de unidad de transporte'}
            subtitle={{
              inicio: 'Configuración',
              accion: 'Características de unidad de transporte',
            }}
          />
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
              + Crear una característica
            </C_BUTTON>
          </Grid>
        </Grid>

        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {features.length > 0 && (
            <C_TABLE search={true} columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <FeatureBodyItems
                    key={item._id}
                    rowElements={item}
                    activateDesactivate={activateDesactivate}
                    enable={features[key].account.enable}
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
  const { features, loadingAction } = state.feature;
  return { features, loadingAction };
};

const actionCreators = {
  list: feature.featuresList,
  activateDesactivate: feature.featureActivateDesactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(Features));
