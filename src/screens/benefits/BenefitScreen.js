import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_TYPOGRAPHY, C_BUTTON, C_TABLE } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { benefit } from '../../state/actions/benefit';
import BenefitBodyItems from './components/table/BenefitBodyItems';

const BenefitScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { benefits, loadingAction, list, activateDeactivate } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(title, id) {
    return { id, title };
  }

  const columns = () => [
    createColumn('Título', 'name'),
    createColumn('Descripción', 'description'),
    createColumn('Precio', 'price'),
    createColumn('Descuento (%)', 'percentage'),
    // createColumn('Enlace', 'link'),
    createColumn('Acción', 'action'),
  ];

  function rows() {
    let dataList = [];
    if (benefits.length > 0) {
      dataList = benefits.map((item) => {
        return {
          _id: item._id /* de primero */,
          name: item.name,
          description: item.description,
          price: item.price || 'Sin precio',
          percentage: item.percentage || 'Sin descuento',
          // link: item.link || 'Sin detalle',
        };
      });
    }
    return dataList;
  }

  function onCreate() {
    history.push('benefits/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loadingAction} />

        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              Beneficios
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
              + Crear beneficio
            </C_BUTTON>
          </Grid>
        </Grid>
        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {benefits.length > 0 && (
            <C_TABLE search={true} columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <BenefitBodyItems
                    key={item._id}
                    rowElements={item}
                    activateDeactivate={activateDeactivate}
                    enable={benefits[key].account.enable}
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
  const { benefits, loadingAction } = state.benefit;
  return { benefits, loadingAction };
};

const actionCreators = {
  list: benefit.benefitsList,
  activateDeactivate: benefit.benefitActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(BenefitScreen));
