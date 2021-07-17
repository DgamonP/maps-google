import React from 'react';
import { reduxForm } from 'redux-form';
import { Grid } from '@material-ui/core';
import { C_FIELD, FormAction } from '../../../components';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Requerido';
  }
  return errors;
};

const TaskCreateForm = (props) => {
  const { t, handleSubmit, reset } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} direction={'row'}>
        <Grid item xs={12} sm={8}>
          <C_FIELD name='name' label={t('task.name')} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormAction onCancel={reset} />
        </Grid>
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'TaskCreateForm',
  validate,
})(TaskCreateForm);
