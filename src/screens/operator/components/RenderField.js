import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core';
import React from 'react';

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <FormControl
      fullWidth={true}
      error={touched && Boolean(error)}
      variant='outlined'
      style={{ marginBottom: 19 }}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        {...input}
        label={label}
        type={type}
        aria-describedby='component-error-text'
      />
      {touched &&
        ((error && <FormHelperText id='component-error-text'>{error}</FormHelperText>) ||
          (warning && <FormHelperText id='component-error-text'>{warning}</FormHelperText>))}
    </FormControl>
  );
};
