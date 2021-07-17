import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@material-ui/lab';

import { C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { loadOrderStatus } from '../../state/actions';

const LoadOrderDetailsState = (props) => {
  const { t, travel, loadOrderStates, loadOrderStatesList } = props;
  const { loadingOrder, travelstatus } = travel || {};

  useEffect(() => {
    loadOrderStatesList();
  }, [loadOrderStatesList]);

  const itemStatus = (item, index) => {
    let exist = false;
    let name = null;
    if (index === 0) {
      exist = true;
      if (loadingOrder && typeof loadingOrder.LoadingOrderStatus[0] === 'undefined') {
        name = travelstatus[travelstatus.length - 1].name;
      }
    } else {
      if (loadingOrder && loadingOrder.LoadingOrderStatus) {
        const { LoadingOrderStatus } = loadingOrder;
        exist = typeof LoadingOrderStatus[index] !== 'undefined';
      }
    }
    let styleTimeLine = {};
    if (exist) {
      styleTimeLine = { background: 'black' };
    } else {
      styleTimeLine = { background: 'white', padding: 3, border: '3px solid #707070' };
    }

    return (
      <TimelineItem style={{ flexDirection: 'column' }} key={index}>
        <TimelineSeparator style={{ flexDirection: 'row' }}>
          <TimelineDot style={styleTimeLine}>
            {exist ? <CheckIcon /> : <RadioButtonUncheckedIcon style={{ color: 'white' }} />}
          </TimelineDot>
          {index + 1 !== loadOrderStates.length && (
            <TimelineConnector style={{ width: 50, border: '1px dashed #707070' }} />
          )}
        </TimelineSeparator>
        <TimelineOppositeContent style={{ position: 'relative', top: -10, left: -18 }}>
          <C_TYPOGRAPHY
            variant='body2'
            fontFamily={item.date ? Montserrat.Bold : Montserrat.SemiBold}
            fontSize={11}
            color={item.date ? '#000000' : '#707070'}
          >
            {name ? name : item.name}
          </C_TYPOGRAPHY>
        </TimelineOppositeContent>
      </TimelineItem>
    );
  };

  return (
    <Grid container direction='column'>
      <Grid item xs={12} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <C_TYPOGRAPHY
            fontFamily={Montserrat.Bold}
            variant={'body1'}
            color={'#707070'}
            fontSize={13}
          >
            {t('operation.stateTitle')}
          </C_TYPOGRAPHY>
        </Grid>

        <Grid item xs={12}>
          <Timeline
            align='right'
            style={{
              paddingLeft: 15,
              flexDirection: 'row',
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            {loadOrderStates && loadOrderStates.map((item, index) => itemStatus(item, index))}
          </Timeline>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { travel } = state.loadOrder;
  const { loadOrderStates } = state.loadOrderStatus;
  return { travel, loadOrderStates };
};

const actionCreators = {
  loadOrderStatesList: loadOrderStatus.loadOrderStatesList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadOrderDetailsState));
