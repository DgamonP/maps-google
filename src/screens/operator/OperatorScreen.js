import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import { C_BUTTON, C_LOADING, C_TABLE, FormTitle } from '../../components';
import OperatorBodyItems from './OperatorBodyItems';
import { operator } from '../../state/actions';

const OperatorScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const { t, history, userId, operators, loadingAction, list, activateDeactivate } = props;

  useEffect(() => {
    list(userId);
  }, [userId, list]);
  /* if (operators === null) {
    console.log('carga pantalla de lista ', props);
    list(userId);
  } */

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    return [
      createColumn(t('operator.firstName'), 'firstName'),
      createColumn(t('operator.lastName'), 'lastName'),
      createColumn(t('operator.documentId'), 'documentId'),
      createColumn(t('operator.email'), 'email'),
      // createColumn(t('operator.companyId'), 'companyId'),
      // createColumn(t('operator.country'), 'country'),
      createColumn('Acción', 'action'),
    ];
  }

  function onCreate() {
    history.push('/operator/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <C_LOADING open={loadingAction} />
        <Grid container direction={'column'}>
          <FormTitle
            title={t('operator.title')}
            subtitle={{
              inicio: 'Configuración',
              title: t('operator.title'),
            }}
          />
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <C_BUTTON
              fullWidth={false}
              variant={'text'}
              style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
              onClick={onCreate}
            >
              + Crear operador
            </C_BUTTON>
          </Grid>
        </Grid>

        <Paper elevation={1} className={classes.paper_table} style={{ marginTop: 15 }}>
          {/* <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Grid item xs={12} sm={3} md={3}>
              <C_TEXTFIELD border={false} search={true} placeholder='Buscar ...' />
            </Grid>
          </Grid> */}
          <C_TABLE
            columns={columns()}
            // variant={'text'}
            // style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
            // fontFamily={Montserrat.SemiBold}
            // textTransform={false}
          >
            {/* {rows().map((item) => (
                <OperatorBodyItems key={item.id} {...item} />
              ))} */}
            {operators &&
              operators.map((item) => (
                <OperatorBodyItems
                  key={item._id}
                  {...item}
                  activateDeactivate={activateDeactivate}
                  userId={userId}
                  // enable={item.account.enable}
                />
              ))}
          </C_TABLE>
        </Paper>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userId } = state.auth;
  const { operators, loadingAction } = state.operator;
  return { operators, loadingAction, userId };
};

const actionCreators = {
  list: operator.operatorsList,
  activateDeactivate: operator.operatorActivateDeactivate,
};
/* const mapDispatchToProps = (dispatch, props) => {
  return {
    // dispatching plain actions
    list: (userId) => dispatch(operator.operatorsList(userId)),
  };
}; */

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperatorScreen));
