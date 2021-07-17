import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

export const renderFieldSelectCountry =  ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <FormControl
      variant='outlined'
      fullWidth={true}
      error={touched && Boolean(error)}
      variant='outlined'
      style={{ marginBottom: 19 }}
    >
      <InputLabel id='renderFieldSelectStates'>{label}</InputLabel>
      <Select label={label} labelId='renderFieldSelectStates'>
        <MenuItem value={'BR'}>Brasil</MenuItem>
        <MenuItem value={'BO'}>Bolivia</MenuItem>
        <MenuItem value={'PY'}>Paraguay</MenuItem>
        <MenuItem value={'CH'}>Chile</MenuItem>
        <MenuItem value={'PE'}>Peru</MenuItem>
        <MenuItem value={'URU'}>Uruguay</MenuItem>
        <MenuItem value={'ARG'}>Argentina</MenuItem>
        <MenuItem value={'CO'}>Colombia</MenuItem>
      </Select>
      {touched &&
        ((error && <FormHelperText id='component-error-text'>{error}</FormHelperText>) ||
          (warning && <FormHelperText id='component-error-text'>{warning}</FormHelperText>))}
    </FormControl>
  );
};
