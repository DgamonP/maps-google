import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { C_DIALOG, C_LOADING, C_SUCCESS, FormTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import { dispatchType, place, stagesTemplate, typeService } from '../../state/actions';
import StagesTemplateCreateForm from './components/StagesTemplateCreateForm';
import StagesTemplateTasksList from './components/StagesTemplateTasksList';

const StagesTemplateCreate = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const {
    stagesTemplate,
    loadingAction,
    success,
    placesList,
    typeServicesList,
    dispatchTypesList,
    offSuccess,
    register,
  } = props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadOrderData, setLoadOrderData] = useState(null);

  useEffect(() => {
    if (stagesTemplate === null) {
      placesList();
      typeServicesList();
      dispatchTypesList();
    }
  }, [stagesTemplate, placesList, typeServicesList, dispatchTypesList]);

  function onBack() {
    history.goBack();
  }

  const goToAddTask = (stageId) => {
    history.push(`/stagesTemplate/addTasks/${stageId}`);
  };

  function onConfirmationData(data) {
    // console.log(data);
    setLoadOrderData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    const { dispatchType, typeService, place } = loadOrderData;
    register(dispatchType._id, typeService._id, place._id);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas crear la plantilla de etapas?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Plantilla de etapas creada exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Crear plantilla de etapas'}
            subtitle={{
              inicio: 'Plantilla de etapas',
              accion: 'Crear plantilla de etapas',
            }}
          />
          {stagesTemplate ? (
            <StagesTemplateTasksList
              stagesTemplate={stagesTemplate}
              onConfirmationData={null}
              goToAddTask={goToAddTask}
            />
          ) : (
            <StagesTemplateCreateForm onSubmit={onConfirmationData} />
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
  placesList: place.placesList,
  typeServicesList: typeService.typeServicesList,
  dispatchTypesList: dispatchType.dispatchTypesList,
  offSuccess: stagesTemplate.offSuccess,
  register: stagesTemplate.stagesTemplateRegister,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(StagesTemplateCreate));
