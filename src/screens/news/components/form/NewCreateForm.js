import React from 'react';
import { Grid } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';

import { FieldFileInput } from './FieldFileInput';
import { C_FIELD, FormAction } from '../../../../components';
import { setPropsAsInicial } from '../../../../utils/setPropsAsInicial';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'El nombre es requerido';
  }
  if (!values.description) {
    errors.description = 'La descripción es requerida';
  }
  if (!values.link) {
    errors.link = 'El link es requerido';
  }
  if (!values.order) {
    errors.order = 'La prioridad es requerida';
  }
  return errors;
};

const priority = [
  { _id: 1, name: 'Alta' },
  { _id: 2, name: 'Media' },
  { _id: 3, name: 'Baja' },
];

let NewCreateForm = (props) => {
  const { handleSubmit, onBack, data } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'column'}>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='name' label='Título' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='description' label='Noticia' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='link' label='Enlace' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='order' label='Prioridad' select2 dataSource={priority} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field component={FieldFileInput} path={data?.path} name='pathPhoto' type='file' />
        </Grid>
        <FormAction onCancel={onBack} />
      </Grid>
    </form>
  );
};

const mapReduxFormData = {
  form: 'newCreateForm', // a unique identifier for this form
  validate,
  enableReinitialize: true,
};

NewCreateForm = reduxForm(mapReduxFormData)(NewCreateForm);

// const mapStateToProps = (state) => ({});

// const actionCreators = {
//   load: client.load,
// };

NewCreateForm = setPropsAsInicial(NewCreateForm);
export default NewCreateForm;

// export default connect(mapStateToProps, actionCreators)(NewCreateForm);
