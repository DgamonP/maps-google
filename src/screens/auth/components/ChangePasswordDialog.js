import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { auth } from '../../../state/actions';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordDialog = (props) => {
  const { t, showDialog, show, submit, cognitoUserSession } = props;

  const onSubmit = (data) => {
    submit(data.correo, data.newPassword, cognitoUserSession);
  };

  const handleClose = () => {
    show(false);
  };

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id='form-dialog-title'>{t('auth.login.changePassword')}</DialogTitle>
      <DialogContent style={{ width: '50%', margin: 'auto' }}>
        <ChangePasswordForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  const { showDialog, cognitoUserSession } = state.auth;
  return { showDialog, cognitoUserSession };
};

const actionCreators = {
  show: auth.showChangePassword,
  submit: auth.completeNewPassword,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(ChangePasswordDialog));
