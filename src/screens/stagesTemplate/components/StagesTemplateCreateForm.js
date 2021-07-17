import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { C_FIELD, FormAction } from '../../../components';

const validate = (values) => {
  const errors = {};
  if (!values.typeService) {
    errors.typeService = 'Requerido';
  }
  if (!values.dispatchType) {
    errors.dispatchType = 'Requerido';
  }
  if (!values.place) {
    errors.place = 'Requerido';
  }
  return errors;
};

const StagesTemplateCreateForm = (props) => {
  const { handleSubmit, reset, places, typeServices, dispatchTypes } = props;
  const placesEdited = JSON.parse(JSON.stringify(places).split('"countryName":').join('"name":'));

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <Grid container direction='row' spacing={2}>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={'typeService'} label={'Tipo servicio'} select2 dataSource={typeServices} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD
            name={'dispatchType'}
            label={'Tipo despacho'}
            select2
            dataSource={dispatchTypes}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={'place'} label={'Ruta'} select2 dataSource={placesEdited} />
        </Grid>
      </Grid>
      <FormAction onCancel={reset} />
    </form>
  );
};

const reduxFormData = {
  form: 'StagesTemplateCreateForm',
  validate,
};

const mapStateToProps = (state) => {
  const { places } = state.place;
  const { typeServices } = state.typeService;
  const { dispatchTypes } = state.dispatchType;
  // const { data } = state.typeTransportUnit;
  return { places, typeServices, dispatchTypes };
};

export default connect(mapStateToProps, null)(reduxForm(reduxFormData)(StagesTemplateCreateForm));
