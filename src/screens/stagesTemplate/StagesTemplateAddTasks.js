import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { C_DIALOG, C_LOADING, C_SUCCESS, C_TYPOGRAPHY, FormTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import { stagesTemplate } from '../../state/actions';
import StagesTemplateAddTasksForm from './components/StagesTemplateAddTasksForm';
import { Montserrat } from '../../theme/fontFamily';

const StagesTemplateAddTasks = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { stageTemplateId } = useParams();
  const { loadingAction, success, stageTemplate, offSuccess, updateTasks, stageTemplateDetails } =
    props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [stagesTemplateData, setStagesTemplateData] = useState(null);

  useEffect(() => {
    stageTemplateDetails(stageTemplateId);
  }, [stageTemplateId, stageTemplateDetails]);

  function onBack() {
    history.goBack();
  }

  function onConfirmationData(data) {
    setStagesTemplateData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    // console.log('stagesTemplateData', stagesTemplateData);
    updateTasks(stageTemplateId, stagesTemplateData);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas crear las tareas?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Tareas creadas exitosamente'}
            onOk={() => {
              offSuccess();
              history.goBack();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Agregar tareas'}
            subtitle={{
              inicio: 'Plantilla de etapas',
              accion: 'Crear plantilla de etapas',
              accion2: 'Agregar tareas',
            }}
          />
          <Grid item xs={12}>
            <C_TYPOGRAPHY display='inline' fontFamily={Montserrat.SemiBold} color={'#909090'}>
              Etapa:
            </C_TYPOGRAPHY>
            <C_TYPOGRAPHY style={{ paddingLeft: 5 }} display='inline' fontFamily={Montserrat.Bold}>
              {stageTemplate && stageTemplate.name}
            </C_TYPOGRAPHY>
          </Grid>
          <StagesTemplateAddTasksForm onSubmit={onConfirmationData} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loadingAction, success, res, stageTemplate } = state.stagesTemplate;
  return { loadingAction, success, res, stageTemplate };
};

const actionCreators = {
  offSuccess: stagesTemplate.offSuccess,
  updateTasks: stagesTemplate.stagesTemplateUpdate,
  stageTemplateDetails: stagesTemplate.stageTemplateDetails,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(StagesTemplateAddTasks));
