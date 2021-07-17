import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { C_BUTTON, C_FIELD } from '../../../components';
import ChangePasswordDialog from './ChangePasswordDialog';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Correo requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Correo inválido';
  }
  if (!values.password) {
    errors.password = 'Password requerido';
  } else if (values.password.length < 6) {
    errors.password = 'Mímino 6 caracteres';
  }
  return errors;
};

let LoginForm = (props) => {
  const { t, handleSubmit, submitting } = props;

  return (
    <>
      <ChangePasswordDialog />
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit(e);
      }}>
        <C_FIELD name='email' label={t('auth.login.email')} />
        <C_FIELD name='password' type='password' label={t('auth.login.password')} autoComplete='off' />
        <C_BUTTON
          type='submit'
          disabled={submitting}
          variant='contained'
          color='primary'
          style={{ marginTop: 12 }}
        >
          {t('auth.login.login')}
        </C_BUTTON>
      </form>
    </>
  );
};

const reduxFormData = {
  form: 'LoginForm',
  validate,
};

const mapStateToProps = (state) => {
  const { data } = state.auth;
  return { initialValues: data };
};

export default connect(mapStateToProps, null)(reduxForm(reduxFormData)(LoginForm));
