import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_TYPOGRAPHY, C_BUTTON, C_TABLE } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { company } from '../../state/actions/company';
import CompanyBodyItems from './components/table/CompanyBodyItems';

const CompanyScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { companies, loadingAction, list, activateDeactivate, t } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(title, id) {
    return { id, title };
  }

  const columns = () => [
    createColumn(t('company.name'), 'name'),
    createColumn(t('company.taxId'), 'taxId'),
    createColumn(t('company.address'), 'address'),
    createColumn(t('company.country'), 'country'),
    createColumn(t('company.city'), 'city'),
    createColumn('Acción', 'action'),
  ];

  function rows() {
    let dataList = [];
    if (companies.length > 0) {
      dataList = companies.map((item) => {
        return {
          _id: item._id /* de primero */,
          name: item.name,
          taxId: item.taxId || 'Sin detalle',
          address: item.address || 'Sin detalle',
          country: item.country || 'Sin detalle',
          city: item.city || 'Sin detalle',
        };
      });
    }
    return dataList;
  }

  function onCreate() {
    history.push('company/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loadingAction} />
        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              Empresa
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
              + Crear empresa
            </C_BUTTON>
          </Grid>
        </Grid>
        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {companies.length > 0 && (
            <C_TABLE columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <CompanyBodyItems
                    key={item._id}
                    rowElements={item}
                    activateDeactivate={activateDeactivate}
                    enable={companies[key].account.enable}
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
  const { companies, loadingAction } = state.company;
  return { companies, loadingAction };
};

const actionCreators = {
  list: company.companiesList,
  activateDeactivate: company.companyActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(CompanyScreen));
