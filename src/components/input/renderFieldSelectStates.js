import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
export const  renderFieldSelectStates = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <FormControl
        variant='outlined'
        fullWidth={true}
        error={touched && Boolean(error)}
        variant='outlined'
        style={{ marginBottom: 19 }}
      >
        <InputLabel id='demo-simple-select-filled-label'>{label}</InputLabel>
        <Select label={label} labelId='demo-simple-select-filled-label'>
          <MenuItem value={'SC'}>Santa Cruz</MenuItem>
          <MenuItem value={'CH'}>Chuquisaca</MenuItem>
          <MenuItem value={'LP'}>La Paz</MenuItem>
          <MenuItem value={'CB'}>Cochabamba</MenuItem>
          <MenuItem value={'OR'}>Oruro</MenuItem>
          <MenuItem value={'PT'}>Potosí</MenuItem>
          <MenuItem value={'TJ'}>Tarija</MenuItem>
          <MenuItem value={'BE'}>Beni</MenuItem>
          <MenuItem value={'PD'}>Pando</MenuItem>
        </Select>
        {touched &&
          ((error && <FormHelperText id='component-error-text'>{error}</FormHelperText>) ||
            (warning && <FormHelperText id='component-error-text'>{warning}</FormHelperText>))}
      </FormControl>
    );
  };