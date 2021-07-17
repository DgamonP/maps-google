import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { C_BUTTON, C_FIELD } from '../../../components';

import { client } from '../../../state/actions';
import { FieldFileInput } from './FieldFileInput';

const data = {
  firstName: 'David',
  lastName: 'Ponce',
  documentId: '123456',
  taxId: 'impuesto',
  pathPhoto:
    'https://th.bing.com/th/id/Rb155c61e749a9dfc95ebc367bb29acf3?rik=El4k%2bk%2f%2baUVGmw&pid=ImgRaw',
  companyId: 'Delta X',
  birthDate: '12/12/2012',
  timeZone: 'string',
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Requerido';
  }
  if (!values.lastName) {
    errors.lastName = 'Requerido';
  }
  if (!values.documentId) {
    errors.documentId = 'Requerido';
  }
  if (!values.taxId) {
    errors.taxId = 'Requerido';
  }
  // if (!values.pathPhoto) {
  //   errors.pathPhoto = 'Requerido';
  // }
  if (!values.companyId) {
    errors.companyId = 'Requerido';
  }
  if (!values.birthDate) {
    errors.birthDate = 'Requerido';
  }
  if (!values.timeZone) {
    errors.timeZone = 'Requerido';
  }

  return errors;
};

let ProfileUpdateForm = (props) => {
  const { t, handleSubmit, load, submitting } = props;

  useEffect(() => {
    load(data);
  }, [load]);

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <Grid container direction={'column'}>
        <C_FIELD name='firstName' label={t('profile.firstName')} />
        <C_FIELD name='lastName' label={t('profile.lastName')} />
        <C_FIELD name='documentId' label={t('profile.documentId')} />
        <C_FIELD name='taxId' label={t('profile.taxId')} />
        <C_FIELD name='companyId' label={t('profile.company')} />
        <C_FIELD name='birthDate' label={t('profile.birthDate')} date={true} />
        <C_FIELD name='timeZone' label={t('profile.timeZone')} />
        {/* <C_FIELD 
          name='pathPhoto' 
          label={ 'Imagen' } 
          type="file"
        /> */}

        <Field component={FieldFileInput} name='pathPhoto' type='file' />
        {/* <FieldFileInput /> */}

        <Grid container direction={'row'} justify={'center'} style={{ marginTop: 5 }}>
          <C_BUTTON
            fullWidth={false}
            type='submit'
            disabled={submitting}
            variant='contained'
            color='primary'
            style={{ marginTop: 19, background: '#EC8105 ', borderRadius: 14 }}
          >
            Editar
          </C_BUTTON>
        </Grid>
      </Grid>
    </form>
  );
};

ProfileUpdateForm = reduxForm({
  form: 'ProfileUpdateForm',
  validate,
})(ProfileUpdateForm);

ProfileUpdateForm = connect(
  (state) => ({
    initialValues: state.client.data,
  }),
  { load: client.load }
)(ProfileUpdateForm);

export default ProfileUpdateForm;
