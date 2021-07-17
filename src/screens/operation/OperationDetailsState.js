import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import CheckIcon from '@material-ui/icons/Check';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import Timeline from '@material-ui/lab/Timeline';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import { C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { operationStatus } from '../../state/actions';

const OperationDetailsState = (props) => {
  const { t, operation, operationStates, operationStatesList } = props;
  const { statusOperationId } = operation || {};

  useEffect(() => {
    operationStatesList();
  }, [operationStatesList]);

  const listOperationStates = operationStates;
  let posicion = -1;
  for (let i = 0; i < listOperationStates.length; i++) {
    if (listOperationStates[i]._id === statusOperationId) {
      posicion = i;
    }
  }
  const toMark = listOperationStates.slice(0, posicion + 1);
  // const notToMark = listOperationStates.slice(posicion + 1, listOperationStates.length);
  toMark.forEach((element) => {
    element.check = true;
  });
  /* const statusEdit = toMark.concat(notToMark);
  console.log('1', listOperationStates);
  console.log(statusEdit); */

  const itemStatus = (item, index) => {
    let styleTimeLine = {};
    if (item.check) {
      styleTimeLine = { background: 'black' };
    } else {
      styleTimeLine = { background: 'white', padding: 3, border: '3px solid #707070' };
    }

    return (
      <TimelineItem style={{ flexDirection: 'column' }} key={index}>
        <TimelineSeparator style={{ flexDirection: 'row' }}>
          <TimelineDot style={styleTimeLine}>
            {item.check ? <CheckIcon /> : <RadioButtonUncheckedIcon style={{ color: 'white' }} />}
          </TimelineDot>
          {index + 1 !== listOperationStates.length && (
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
            {item.name}
          </C_TYPOGRAPHY>
        </TimelineOppositeContent>
      </TimelineItem>
    );
  };

  return (
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
          style={{ paddingLeft: 15, flexDirection: 'row', overflowX: 'auto', overflowY: 'hidden' }}
        >
          {listOperationStates && listOperationStates.map((item, index) => itemStatus(item, index))}
        </Timeline>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { operation } = state.operation;
  const { operationStates } = state.operationStatus;
  return { operation, operationStates };
};

const actionCreators = {
  operationStatesList: operationStatus.operationStatesList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperationDetailsState));
