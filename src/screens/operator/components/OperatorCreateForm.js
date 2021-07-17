import React from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { C_FIELD, FormAction } from '../../../components';
import 'react-datepicker/dist/react-datepicker.css';

const states = [
  { _id: 'SC', name: 'Santa Cruz' },
  { _id: 'CH', name: 'Chuquisaca' },
  { _id: 'LP', name: 'La Paz' },
  { _id: 'CB', name: 'Cochabamba' },
  { _id: 'OR', name: 'Oruro' },
  { _id: 'PT', name: 'Potosí' },
  { _id: 'TJ', name: 'Tarija' },
  { _id: 'BE', name: 'Beni' },
  { _id: 'PD', name: 'Pando' },
];

const validate = (values) => {
  const errors = { type: 'OPERATOR', auth: {}, profile: {} };
  if (!values.auth?.countryCode) {
    errors.auth.countryCode = 'Requerido';
  }
  if (!values.auth?.phone) {
    errors.auth.phone = 'Requerido';
  }
  if (!values.auth?.email) {
    errors.auth.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Correo inválido';
  }
  if (!values.profile?.firstName) {
    errors.profile.firstName = 'Requerido';
  }
  if (!values.profile?.lastName) {
    errors.profile.lastName = 'Requerido';
  }
  if (!values.profile?.documentId) {
    errors.profile.documentId = 'Requerido';
  }
  if (!values.states) {
    errors.states = 'Requerido';
  }
  return errors;
};

const OperatorCreateForm = (props) => {
  const { handleSubmit, reset } = props;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <Grid container direction={'column'}>
        <Grid container spacing={1} direction={'row'}>
          <Grid item xs={12} sm={2}>
            <C_FIELD name='auth.countryCode' label='Código País' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <C_FIELD name='auth.phone' label='Nro. Celular' />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='auth.email' label='Correo electrónico' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='profile.firstName' label='Nombres' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='profile.lastName' label='Apellidos' />
        </Grid>
        <Grid container spacing={1} direction={'row'}>
          <Grid item xs={12} sm={3}>
            <C_FIELD name='profile.documentId' label='ID documento' />
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* <C_FIELD name='states' label='Lugar' select dataSource={states} /> */}
            <C_FIELD
              name='states'
              label='Lugar'
              select
              contentSelect={states.map((item, key) => {
                return (
                  <MenuItem key={key} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            />
          </Grid>
        </Grid>
        <FormAction onCancel={reset} />
      </Grid>
    </form>
  );
};

const reduxFormData = {
  form: 'operatorCreateForm',
  validate,
  enableReinitialize: true,
};

const mapStateToProps = (state) => {
  const { data } = state.operator;
  return { initialValues: data };
};

export default connect(mapStateToProps, null)(reduxForm(reduxFormData)(OperatorCreateForm));
