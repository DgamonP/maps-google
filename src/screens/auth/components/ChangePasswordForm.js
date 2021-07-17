import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { auth } from '../../../state/actions';
import { withTranslation } from 'react-i18next';
import { C_BUTTON, C_FIELD } from '../../../components';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Correo inválido';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Requerido';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Mímino 6 caracteres';
  }
  if (!values.repeatNewPassword) {
    errors.repeatNewPassword = 'Requerido';
  } else if (values.repeatNewPassword !== values.newPassword) {
    errors.repeatNewPassword = 'Los password no coinciden';
  }
  return errors;
};

let ChangePasswordForm = (props) => {
  const { t, handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <C_FIELD name='email' label={t('auth.login.email')} disabled={true} />
      <C_FIELD name='newPassword' type='password' label={t('auth.login.newPassword')} autocomplete='on'/>
      <C_FIELD name='repeatNewPassword' type='password' label={t('auth.login.repeatNewPassword')} autocomplete='on'/>
      <C_BUTTON
        type='submit'
        disabled={submitting}
        variant='contained'
        color='primary'
        style={{ marginTop: 12 }}
      >
        Cambiar contraseña
      </C_BUTTON>
    </form>
  );
};

ChangePasswordForm = reduxForm({
  form: 'LoginClientForm',
  validate,
})(ChangePasswordForm);

ChangePasswordForm = connect(
  (state) => ({
    initialValues: state.auth.data,
    err: state.auth.error,
  }),
  { load: auth.load }
)(ChangePasswordForm);

export default withTranslation()(ChangePasswordForm);
