import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { client } from '../../../state/actions';
import { C_BUTTON, C_FIELD } from '../../../components';

const data = {
  name: 'operador 1',
};

const states = [
  { value: 'SC', label: 'Santa Cruz' },
  { value: 'CH', label: 'Chuquisaca' },
  { value: 'LP', label: 'La Paz' },
  { value: 'CB', label: 'Cochabamba' },
  { value: 'OR', label: 'Oruro' },
  { value: 'PT', label: 'Potosí' },
  { value: 'TJ', label: 'Tarija' },
  { value: 'BE', label: 'Beni' },
  { value: 'PD', label: 'Pando' },
];

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

let OperatorUpdateForm = (props) => {
  const { handleSubmit, load, pristine, reset, submitting } = props;

  useEffect(() => {
    load(data);
  }, [load]);

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
        <Grid container direction={'column'}>
          <Grid container spacing={3} direction={'row'}>
            <Grid item xs={12} sm={4}>
              <C_FIELD name='auth.countryCode' label='countryCode' />
            </Grid>
            <Grid item xs={12} sm={8}>
              <C_FIELD name='auth.phone' label='phone' />
            </Grid>
          </Grid>
          <C_FIELD name='auth.email' label='email' />

          <Grid container spacing={3} direction={'row'}>
            <Grid item xs={12} sm={6}>
              <C_FIELD name='profile.firstName' label='firstName' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <C_FIELD name='profile.lastName' label='lastName' />
            </Grid>
          </Grid>

          {/* cambiar a select */}
          <C_FIELD name='profile.companyId' label='companyId' />

          <Grid container spacing={3} direction={'row'}>
            <Grid item xs={12} sm={6}>
              <C_FIELD name='profile.documentId' label='Carnet de identidad' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <C_FIELD name='states' label='Lugar' select={true} dataSource={states} />
            </Grid>
          </Grid>

          <Grid container direction={'row'} justify={'center'} style={{ marginTop: 5 }}>
            <C_BUTTON
              fullWidth={false}
              type='button'
              variant='contained'
              onClick={reset}
              style={{
                marginTop: 19,
                background: 'transparent',
                color: '#707070',
                border: '2px solid #707070',
                marginRight: 23,
                borderRadius: 14,
              }}
            >
              Cancelar
            </C_BUTTON>
            <C_BUTTON
              fullWidth={false}
              type='submit'
              disabled={submitting}
              variant='contained'
              color='primary'
              style={{ marginTop: 19, background: '#EC8105 ', borderRadius: 14 }}
            >
              Continuar
            </C_BUTTON>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
OperatorUpdateForm = reduxForm({
  form: 'OperatorUpdateForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(OperatorUpdateForm);

OperatorUpdateForm = connect(
  (state) => ({
    initialValues: state.client.data,
  }),
  { load: client.load }
)(OperatorUpdateForm);

export default OperatorUpdateForm;
