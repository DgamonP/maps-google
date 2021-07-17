import React from 'react';
import { Grid } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';

import { C_FIELD, FormAction } from '..';
import { setPropsAsInicial } from '../../utils/setPropsAsInicial';
import { FieldFileInput } from '../../screens/benefits/components/form/FieldFileInput';

const validate = (values, props) => {
  const { fields } = props;
  /* console.log('values ==>', values);
  console.log('fields ==>', fields); */
  const errors = {};
  for (const fieldItem of fields) {
    if (!values[fieldItem.name]) {
      if (fieldItem.require) {
        errors[fieldItem.name] = 'Requerido';
      }
    }
  }
  return errors;
};

const handleField = (item) => {
  const typefields = {
    select: <C_FIELD name={item.name} label={item.label} select2 dataSource={item.options} />,
    checkbox: <C_FIELD name={item.name} label={item.label} checkbox />,
    date: <C_FIELD name={item.name} label={item.label} date />,
    number: <C_FIELD name={item.name} label={item.label} type={'number'} />,
    // file: <Field component={FieldFileInput} path={data?.path} name='path' type='file' />,
    file: <Field component={FieldFileInput} name={item.name} type='file' />,
  };
  return typefields[item.type] || <C_FIELD name={item.name} label={item.label} />;
};

let FormGeneric = (props) => {
  const { handleSubmit, reset, load, data, fields } = props;
  const handleReset = () => {
    // console.log('data', data);
    if (data === null) {
      reset();
    } else {
      load(null);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'column'}>
        {fields.map((item) => (
          <Grid key={item.name} item xs={12} sm={6}>
            {handleField(item)}
          </Grid>
        ))}
        <FormAction onCancel={handleReset} />
      </Grid>
    </form>
  );
};

FormGeneric = reduxForm({
  form: 'FormGeneric',
  validate,
  enableReinitialize: true,
})(FormGeneric);

FormGeneric = setPropsAsInicial(FormGeneric);
// FormGeneric = connect(
//   (state, props) => ({
//     // initialValues: state.typeService.data, //esto tiene que ser variable
//     initialValues: props.data,
//   }),
//   {}
// )(FormGeneric);

export { FormGeneric };
