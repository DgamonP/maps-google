import React, { useEffect } from 'react';

import { Card, CardContent, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { client } from '../../../state/actions';

import { C_BUTTON, C_FIELD, C_TYPOGRAPHY } from '../../../components';
import { Montserrat } from '../../../theme/fontFamily';

const states = [
  {
    modulesId: '1',
    name: 'Operaciones',
    create: true,
    read: false,
    update: true,
    delete: true,
    admin: true,
  },
  {
    modulesId: '2',
    name: 'Oportunidades',
    create: true,
    read: false,
    update: true,
    delete: false,
    admin: true,
  },
  {
    modulesId: '3',
    name: 'Clientes',
    create: false,
    read: true,
    update: false,
    delete: true,
    admin: false,
  },
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

let ClientRolesForm = (props) => {
  const { className, handleSubmit, load, pristine, reset, submitting } = props;

  useEffect(() => {}, [load]);

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
        <Grid container direction={'column'}>
          <Grid container direction={'column'}>
            {states.map((state, index) => (
              <div key={state.modulesId}>
                <Card style={{ marginBottom: 19, borderRadius: 2 }}>
                  <CardContent>
                    <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Medium} fontSize={14}>
                      {state.name}
                    </C_TYPOGRAPHY>

                    <Grid container className={className.d_flex} style={{ marginTop: 10 }}>
                      <C_FIELD name={`${state.modulesId}.create`} label='Crear' checkbox={true} />
                      <C_FIELD name={`${state.modulesId}.read`} label='Leer' checkbox={true} />
                      <C_FIELD
                        name={`${state.modulesId}.update`}
                        value={state.update}
                        label='Actualizar'
                        checkbox={true}
                      />
                      <C_FIELD
                        name={`${state.modulesId}.delete`}
                        value={state.delete}
                        label='Eliminar'
                        checkbox={true}
                      />
                      <C_FIELD
                        name={`${state.modulesId}.admin`}
                        value={state.admin}
                        label='Administrador'
                        checkbox={true}
                      />
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Grid>

          <Grid container direction={'row'}>
            <C_BUTTON
              fullWidth={false}
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
ClientRolesForm = reduxForm({
  form: 'clientRolesForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(ClientRolesForm);

ClientRolesForm = connect(
  (state) => ({
    initialValues: state.client.data,
  }),
  { load: client.load }
)(ClientRolesForm);

export default ClientRolesForm;
