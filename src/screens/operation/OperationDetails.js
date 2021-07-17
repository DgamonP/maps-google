import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';

import { Montserrat } from '../../theme/fontFamily';
import { StyleContext } from '../../theme/BaseStyles';
import { C_BUTTON, C_TYPOGRAPHY } from '../../components';
import { operation } from '../../state/actions';
import OperationDetailsInfo from './OperationDetailsInfo';
import LoadOrderScreen from '../loadOrder/LoadOrderScreen';
import OperationDetailsState from './OperationDetailsState';

const OperationDetails = (props) => {
  const history = useHistory();
  const { operationId } = useParams();
  const classes = useContext(StyleContext);
  const { t, operations, details } = props;

  useEffect(() => {
    details(operationId, operations);
  }, [details, operationId, operations]);

  const onPress = () => {
    history.goBack();
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>
          <Grid item xs={12}>
            <KeyboardBackspace
              fontSize='large'
              onClick={onPress}
              style={{ cursor: 'pointer', color: '#070707' }}
            />
          </Grid>

          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              {t('operation.details.title')}
            </C_TYPOGRAPHY>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 1 }}>
            <C_TYPOGRAPHY fontFamily={Montserrat.ExtraLight} fontSize={12}>
              {t('operation.operation')} &gt; {t('operation.details.title')}
            </C_TYPOGRAPHY>
          </Grid>
        </Grid>

        <OperationDetailsInfo />
        <OperationDetailsState />

        <Grid container direction='row' style={{ marginTop: 15 }}>
          <C_BUTTON
            fullWidth={false}
            variant='outlined'
            style={{ marginRight: 8 }}
            onClick={() => history.push(`/operation/update/${operationId}`)}
          >
            {t('operation.details.edit')}
          </C_BUTTON>
          {/* <C_BUTTON fullWidth={false} color={'secondary'} variant='outlined'>
            {t('operation.details.liquidate')}
          </C_BUTTON> */}
        </Grid>

        <LoadOrderScreen />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { operations } = state.operation;
  return { operations };
};

const actionCreators = {
  details: operation.operationDetails,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperationDetails));
