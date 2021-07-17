import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';

import { ScreenTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import HomeInfo from './HomeInfo';
import HomeClientScreen from './HomeClientScreen';
import HomeNotification from './HomeNotification';
import OperationScreen from '../operation/OperationScreen';

const HomeScreen = (props) => {
  const { t, roles } = props;
  const classes = React.useContext(StyleContext);
  const find = roles.find((item) => item.code === 'operation' && item.read);

  if (find) {
    return (
      <>
        <div className={classes.mainHome}>
          <Paper className={classes.mainRoot} elevation={0}>
            <ScreenTitle title={t('menu.home')} create={false} />

            <HomeInfo />

            <HomeNotification />
          </Paper>
        </div>
        <OperationScreen create={false} />
      </>
    );
  } else {
    return <HomeClientScreen />;
  }
};

const mapStateToProps = (state) => {
  const { userType, roles } = state.auth;
  return { userType, roles };
};

export default connect(mapStateToProps, null)(withTranslation()(HomeScreen));
