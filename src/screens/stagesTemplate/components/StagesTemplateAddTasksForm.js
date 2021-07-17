import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';

import { Montserrat } from '../../../theme/fontFamily';
import { C_BUTTON, C_FIELD, C_TYPOGRAPHY, FormAction } from '../../../components';

const validate = (values) => {
  const errors = {};
  if (!values.tasks || !values.tasks.length) {
    errors.tasks = { _error: 'Se debe ingresar al menos una tarea.' };
  } else {
    const tasksArrayErrors = [];
    values.tasks.forEach((task, taskIndex) => {
      const taskErrors = {};
      if (!task || !task.name) {
        taskErrors.name = 'Requerido';
        tasksArrayErrors[taskIndex] = taskErrors;
      }
    });
    if (tasksArrayErrors.length) {
      errors.tasks = tasksArrayErrors;
    }
  }
  return errors;
};

const headerCell = (title) => (
  <C_TYPOGRAPHY fontFamily={Montserrat.Bold} style={{ paddingLeft: 4 }} fontSize={14}>
    {title}
  </C_TYPOGRAPHY>
);
const rowCell = (title) => (
  <Grid item xs={12} sm={1}>
    <div style={{ marginLeft: 8 }}>
      <C_FIELD name={title} checkbox />
    </div>
  </Grid>
);

const Renderitems = ({ fields, meta: { touched, error, submitFailed } }) => {
  return (
    <>
      <Grid item container direction={'row'} alignItems='center'>
        {/* <Grid item xs={12} sm={1} style={{ position: 'relative', top: 17 }}> */}
        <Grid item xs={12} sm={2}>
          {headerCell('Nombre')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Cambia etapa')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Ve el chofer')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Ve el cliente')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Permite archivo')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Enviar notificación')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Valida operador')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Valida cliente')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Acción del operador')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Acción del chofer')}
        </Grid>
        <Grid item xs={12} sm={1}>
          {headerCell('Acción del cliente')}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        {fields.map((item, index) => {
          return (
            <Grid key={index} container direction={'row'} alignItems='flex-end' justify='center'>
              <Grid item xs={12} sm={2}>
                <C_FIELD name={`${item}.name`} label='Nombre' />
              </Grid>
              {rowCell(`${item}.changeStage`)}
              {rowCell(`${item}.viewCarrier`)}
              {rowCell(`${item}.viewClient`)}
              {rowCell(`${item}.allowFiles`)}
              {rowCell(`${item}.pushNotification`)}
              {rowCell(`${item}.validation.operator`)}
              {rowCell(`${item}.validation.client`)}
              {rowCell(`${item}.allow.operator`)}
              {rowCell(`${item}.allow.carrier`)}
              {rowCell(`${item}.allow.client`)}
            </Grid>
          );
        })}
      </Grid>
      <Grid container item xs={12} style={{ marginTop: 5 }}>
        <C_BUTTON fullWidth={false} variant='outlined' onClick={() => fields.push({})}>
          Agregar tarea
        </C_BUTTON>
      </Grid>
      {/* {(touched || submitFailed) && error && <span>{error}</span>} */}
      <Grid item xs={12} sm={12}>
        {submitFailed && error && (
          <C_TYPOGRAPHY
            variant={'caption'}
            style={{ color: '#f44336', marginTop: '20px', marginLeft: '14px', marginRight: '14px' }}
            fontFamily={'Helvetica'}
            fontWeight={'400'}
            fontSize={14}
          >
            {error}
          </C_TYPOGRAPHY>
        )}
      </Grid>
    </>
  );
};

const StagesTemplateAddTasksForm = (props) => {
  const { handleSubmit, reset } = props;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <FieldArray name='tasks' component={Renderitems} />
      <FormAction onCancel={reset} />
    </form>
  );
};

const reduxFormData = {
  form: 'StagesTemplateAddTasksForm',
  validate,
  enableReinitialize: true,
};

const mapStateToProps = (state) => {
  const { data } = state.stagesTemplate;
  return { initialValues: data };
};

export default connect(mapStateToProps, null)(reduxForm(reduxFormData)(StagesTemplateAddTasksForm));
