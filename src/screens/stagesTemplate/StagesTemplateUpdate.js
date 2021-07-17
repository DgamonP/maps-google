import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { C_DIALOG, C_LOADING, C_SUCCESS, FormTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import { stagesTemplate } from '../../state/actions';
import StagesTemplateTasksList from './components/StagesTemplateTasksList';

const StagesTemplateUpdate = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { dispatchTypeId, typeServiceId, placeId } = useParams();
  const { stagesTemplate, loadingAction, success, offSuccess, stagesTemplateDetails, deleteTask } =
    props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadOrderData, setLoadOrderData] = useState(null);

  useEffect(() => {
    if (stagesTemplate === null) {
      stagesTemplateDetails(dispatchTypeId, typeServiceId, placeId);
    }
  }, [stagesTemplate, dispatchTypeId, typeServiceId, placeId, stagesTemplateDetails]);

  function onBack() {
    history.goBack();
  }

  const goToAddTask = (stageId) => {
    history.push(`/stagesTemplate/addTasks/${stageId}`);
  };

  function onConfirmationData(stageId, taskId) {
    setLoadOrderData({ stageId, taskId });
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    deleteTask(loadOrderData.stageId, loadOrderData.taskId, dispatchTypeId, typeServiceId, placeId);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas eliminar la tarea?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Tarea eliminada exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Editar plantilla de etapas'}
            subtitle={{
              inicio: 'Plantilla de etapas',
              accion: 'Detalle de plantilla de etapas',
              accion2: 'Editar plantilla de etapas',
            }}
          />
          {stagesTemplate && (
            <StagesTemplateTasksList
              stagesTemplate={stagesTemplate}
              onConfirmationData={onConfirmationData}
              goToAddTask={goToAddTask}
            />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loadingAction, success, stagesTemplate } = state.stagesTemplate;
  return { loadingAction, success, stagesTemplate };
};

const actionCreators = {
  offSuccess: stagesTemplate.offSuccess,
  stagesTemplateDetails: stagesTemplate.stagesTemplateDetails,
  deleteTask: stagesTemplate.stagesTemplateDeleteTask,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(StagesTemplateUpdate));
