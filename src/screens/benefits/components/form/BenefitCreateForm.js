import React, { useEffect, useState } from 'react';
import { Grid, IconButton, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FieldFileInput } from './FieldFileInput';

import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';

// import { client } from '../../../../state/actions';
import { C_FIELD, FormAction, C_BUTTON, C_TYPOGRAPHY } from '../../../../components';
import { setPropsAsInicial } from '../../../../utils/setPropsAsInicial';

// const data = {
//   name: 'operador 1',
// };

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

const warn = (values) => {
  const warnings = {};
  return warnings;
};

const priority = [
  { _id: 1, name: 'Alta', value: 'Alta' },
  { _id: 2, name: 'Media', value: 'Media' },
  { _id: 3, name: 'Baja', value: 'Baja' },
];

let BenefitCreateForm = (props) => {
  const { handleSubmit, load, onBack, reset, submitting, path, data } = props;
  // console.log('path ==>', data?.path);
  // useEffect(() => {
  //   load(data);
  // }, [load]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'column'}>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='name' label='Título' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <C_FIELD name='description' label='Detalle' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <C_FIELD name='price' label='Precio' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <C_FIELD name='percentage' label='Porcentaje' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <C_FIELD name='phone' label='Celular' />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <C_FIELD name='link' label='Enlace' />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <C_FIELD name='order' label='Prioridad' select2={true} dataSource={priority} />
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
  warn, // <--- warning function given to redux-form
  enableReinitialize: true,
};

BenefitCreateForm = reduxForm(mapReduxFormData)(BenefitCreateForm);

// const mapStateToProps = (state) => ({});

// const actionCreators = {
//   load: client.load,
// };

BenefitCreateForm = setPropsAsInicial(BenefitCreateForm);
export default BenefitCreateForm;

// export default connect(mapStateToProps, actionCreators)(BenefitCreateForm);
