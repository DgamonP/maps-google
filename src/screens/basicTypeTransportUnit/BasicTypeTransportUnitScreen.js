import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_BUTTON, C_TABLE, FormTitle } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { basicTypeTransportUnit } from '../../state/actions/basicTypeTransportUnit';
import BasicTypeTransportUnitItem from './components/BasicTypeTransportUnitItem';

const BasicTypeTransportUnitScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { basicTypeTransportUnits, loadingAction, list, activateDeactivate } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(title, id) {
    return { id, title };
  }

  const columns = () => [
    createColumn('Título', 'name'),
    // createColumn('Imagen', 'path'),
    createColumn('Acción', 'action'),
  ];

  function rows() {
    let dataList = [];
    if (basicTypeTransportUnits.length > 0) {
      dataList = basicTypeTransportUnits.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          // path: item.path,
        };
      });
    }
    return dataList;
  }

  function onCreate() {
    history.push('basicTypeTransportUnit/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loadingAction} />
        <Grid container direction={'column'}>
          <FormTitle
            title={'Tipo de unidad de transporte'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Tipo de unidad de transporte',
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
              + Crear tipo de unidad de transporte
            </C_BUTTON>
          </Grid>
        </Grid>

        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {basicTypeTransportUnits.length > 0 && (
            <C_TABLE search={true} columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <BasicTypeTransportUnitItem
                    key={item._id}
                    rowElements={item}
                    activateDeactivate={activateDeactivate}
                    enable={basicTypeTransportUnits[key].account.enable}
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
  const { basicTypeTransportUnits, loadingAction } = state.basicTypeTransportUnit;
  return { basicTypeTransportUnits, loadingAction };
};

const actionCreators = {
  list: basicTypeTransportUnit.basicTypeTransportUnitsList,
  activateDeactivate: basicTypeTransportUnit.basicTypeTransportUnitActivateDeactivate,
};

export default connect(
  mapStateToProps,
  actionCreators
)(withTranslation()(BasicTypeTransportUnitScreen));
