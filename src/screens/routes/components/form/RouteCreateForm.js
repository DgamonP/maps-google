import React from 'react';
import { Grid } from '@material-ui/core';
import { reduxForm } from 'redux-form';

import { setPropsAsInicial } from '../../../../utils/setPropsAsInicial';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'El nombre es requerido';
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  return warnings;
};


let RouteCreateForm = (props) => {
  const { handleSubmit, onBack, data, markers, icons, places } = props;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'row'} spacing={2}>
        </Grid>
      </form>
    </>
  );
};

const mapReduxFormData = {
  form: 'routeCreateForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
  enableReinitialize: true,
};

RouteCreateForm = reduxForm(mapReduxFormData)(RouteCreateForm);

RouteCreateForm = setPropsAsInicial(RouteCreateForm);
export default RouteCreateForm;
