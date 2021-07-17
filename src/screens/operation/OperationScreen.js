import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { Paper } from '@material-ui/core';

import { company, operation } from '../../state/actions';
import { operationStatus } from '../../state/actions/operationStatus';

import { StyleContext } from '../../theme/BaseStyles';
import { ScreenTitle } from '../../components';
import OperationList from './components/OperationList';

const OperationScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const {
    history,
    create,
    companies,
    t,
    operations,
    operationStates,
    list,
    companiesList,
    listOperationState,
  } = props;

  useEffect(() => {
    list();
  }, [list]);

  useEffect(() => {
    listOperationState();
  }, [listOperationState]);

  useEffect(() => {
    companiesList();
  }, [companiesList]);

  function onCreate() {
    history.push('/operation/create');
  }

  return (
    <>
      <div className={classes.mainHome}>
        <Paper className={classes.mainRoot} elevation={0}>
          <ScreenTitle
            title={t('operation.title')}
            createText={t('operation.create.title')}
            onCreate={onCreate}
            create={create}
          />
          <Paper elevation={1} className={classes.paper_table} style={{ marginTop: 15 }}>
            <OperationList
              operationStates={operationStates}
              operations={operations}
              t={t}
              companies={companies}
            />
          </Paper>
        </Paper>
      </div>
    </>
  );
};

OperationScreen.propTypes = {
  create: PropTypes.bool,
};

OperationScreen.defaultProps = {
  create: true,
};

const mapStateToProps = (state) => {
  const { operations } = state.operation;
  const { operationStates } = state.operationStatus;
  const { companies } = state.company;
  return { companies, operations, operationStates };
};

const actionCreators = {
  list: operation.operationsList,
  listOperationState: operationStatus.operationStatesList,
  companiesList: company.companiesList,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(withTranslation()(OperationScreen))
);
