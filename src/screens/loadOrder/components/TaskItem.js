import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

import { useParams } from 'react-router';
import { C_BUTTON } from '../../../components';
import { Alert, AlertTitle } from '@material-ui/lab';
import { notification, stage } from '../../../state/actions';

const TaskItem = (props) => {
  const {
    stageId,
    name,
    file,
    action,
    validation,
    allowFile,
    showNotification,
    taskDetails,
    taskApprove,
  } = props;
  const { operator } = validation || {};
  const { loadOrderId } = useParams();

  const [status, setStatus] = useState('Pendiente');

  useEffect(() => {
    if (action) {
      if (operator) {
        if (action.dateValidation) {
          setStatus('Completada');
        } else {
          setStatus('Requiere validación');
        }
      } else {
        /* require or not require file */
        if (action.dateAction) {
          setStatus('Completada');
        }
      }
    }
  }, [setStatus, action, allowFile, operator]);

  const handleClickShow = () => {
    if (status === 'Completada') {
      showNotification(true, false);
    } else {
      showNotification(true, true);
    }
    taskDetails(props._id, stageId, []);
  };

  const handleAproved = () => {
    taskApprove(props._id, stageId, action, loadOrderId);
  };

  function componentShowTasks() {
    if (file.length > 0) {
      return (
        <Grid>
          <C_BUTTON fullWidth={false} style={{ padding: 2 }} onClick={handleClickShow}>
            Ver
          </C_BUTTON>
        </Grid>
      );
    }
    if (operator && action && !action.dateValidation) {
      return (
        <Grid>
          {/* <C_BUTTON
            fullWidth={false}
            color={'secondary'}
            style={{ padding: 2, marginLeft: 4 }}
            onClick={() => {}}
          >
            Rechazar
          </C_BUTTON> */}
          <C_BUTTON fullWidth={false} style={{ padding: 2 }} onClick={handleAproved}>
            Validar
          </C_BUTTON>
        </Grid>
      );
    }
  }

  return (
    <Paper elevation={1} style={{ borderRadius: 4, padding: 5, margin: '10px 0' }}>
      <Grid container direction={'row'}>
        <Alert
          style={{ borderRadius: 4, width: '100%' }}
          severity={
            status === 'Pendiente' ? 'error' : status === 'Completada' ? 'success' : 'warning'
          }
          title={status}
          action={<>{componentShowTasks()}</>}
        >
          <AlertTitle> {status} </AlertTitle>
          {name}
        </Alert>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = () => {
  // const { stages, stage } = state.stage;
  return {};
};

const actionCreators = {
  showNotification: notification.showNotification,
  taskDetails: stage.stageTaskDetails,
  taskApprove: stage.stageTaskApprove,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(TaskItem));
