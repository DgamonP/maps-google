import React from 'react';
import { Grid } from '@material-ui/core';
import { FieldFileInput } from './FieldFileInput';

import { reduxForm, Field } from 'redux-form';

// import { client } from '../../../../state/actions';
import { C_FIELD, FormAction } from '../../../components';
import { setPropsAsInicial } from '../../../utils/setPropsAsInicial';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'El nombre es requerido';
  }

  if (!values.description) {
    errors.description = 'La descripción es requerido';
  }
  if (!values.price) {
    errors.price = 'La descripción es requerido';
  }

  if (!values.description) {
    errors.description = 'La descripción es requerido';
  }

  if (!values.phone) {
    errors.phone = 'La descripción es requerido';
  }

  // if (!values.link) {
  //   errors.link = 'El link es requerida';
  // }
  if (!values.order) {
    errors.order = 'La prioridad es requerida';
  }

  return errors;
};

let BasicTypeTransportUnitForm = (props) => {
  const { handleSubmit, onBack, data } = props;
  // console.log('path ==>', data?.path);
  // useEffect(() => {
  //   load(data);
  // }, [load]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'column'}>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='name' label='Nombre' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field component={FieldFileInput} path={data?.path} name='pathPhoto' type='file' />
          </Grid>

          <FormAction onCancel={onBack} />
        </Grid>
      </form>
    </>
  );
};

const mapReduxFormData = {
  form: 'benefitCreateForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  enableReinitialize: true,
};

BasicTypeTransportUnitForm = reduxForm(mapReduxFormData)(BasicTypeTransportUnitForm);

BasicTypeTransportUnitForm = setPropsAsInicial(BasicTypeTransportUnitForm);
export default BasicTypeTransportUnitForm;
