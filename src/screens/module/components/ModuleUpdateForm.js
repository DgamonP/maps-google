import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Grid } from '@material-ui/core';

import { client } from '../../../state/actions';
import { C_FIELD, FormAction } from '../../../components';

const data = {
  name: 'Modulo 1',
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Requerido';
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  return warnings;
};

let ModuleUpdateForm = (props) => {
  const { handleSubmit, load, onBack, pristine, reset, submitting } = props;

  useEffect(() => {
    load(data);
  }, [load]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'column'}>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='name' label='Nombre' />
          </Grid>

          <FormAction onCancel={reset} />
        </Grid>
      </form>
    </>
  );
};

const mapReduxFormData = {
  form: 'ModuleUpdateForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
};

const mapStateToProps = (state) => ({
  initialValues: state.client.data,
});

const actionCreators = {
  load: client.load,
};

export default connect(
  mapStateToProps,
  actionCreators
)(reduxForm(mapReduxFormData)(ModuleUpdateForm));
