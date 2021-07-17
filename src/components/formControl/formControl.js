import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { KeyboardDatePicker, TimePicker } from '@material-ui/pickers';

import { orange, red } from '@material-ui/core/colors';
import SvgColor from 'react-svg-color';

/* const C_CHECKBOX = (props) => {
  const themes = createMuiTheme({
    palette: {
      primary: orange,
      secondary: red,
    },
  });
  // console.log(props)
  return (
    <div>
      <ThemeProvider theme={themes}>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              {...props.input}
              // onChange={(event, value) => props.input.onChange(value)}
              color='primary'
            />
          }
          label={props.label}
        />
      </ThemeProvider>
    </div>
  );
}; */

const C_FORMCONTROL = (props) => {
  const {
    checkbox,
    radio,
    dataSource,
    date,
    time,
    describedby,
    disabled,
    error,
    id,
    input,
    label,
    select,
    select2,
    style,
    type,
    touched,
    variant,
  } = props;

  // const [openDatePicker, setOpenDatePicker] = React.useState(false);
  function onAction() {
    if (select) {
      // input.value = (input.value === "" ) ? dataSource.length > 0 ? dataSource[0]._id : "" : input.value;
      return (
        <Select
          label={label}
          id={id}
          aria-describedby={describedby}
          draggable
          style={{ borderRadius: 6, background: 'white' }}
          {...input}
        >
          {dataSource.map((item, key) => {
            return (
              <MenuItem key={key} value={item}>
                {item.name}
              </MenuItem>
            );
          })}

          {props.contentSelect}
        </Select>
      );
    }
    if (select2) {
      let selected = '';
      if (input.value !== '') {
        // console.log('input.value', input.value);
        let result;
        if (input.value._id) {
          result = dataSource.filter((item) => item._id === input.value._id);
        } else {
          result = dataSource.filter((item) => item._id === input.value);
        }
        selected = result[0];
      }
      return (
        <Select
          label={label}
          id={id}
          aria-describedby={describedby}
          draggable
          style={{ borderRadius: 6, background: 'white' }}
          {...input}
          onChange={(event) => input.onChange(event.target.value)}
          labelId={label}
          value={selected || ''}
        >
          {dataSource.map((option) => (
            <MenuItem key={option._id} value={option}>
              {option.name}
            </MenuItem>
          ))}
          {/* {props.contentSelect} */}
        </Select>
      );
    }
    if (date) {
      return (
        <KeyboardDatePicker
          format='dd/MM/yyyy'
          disableToolbar
          inputVariant={'outlined'}
          {...input}
          label={label}
          size={'small'}
          helperText={''}
          error={touched && Boolean(error)}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(date) => input.onChange(date)}
          value={input.value === '' ? null : input.value}
          animateYearScrolling
          placeholder={'Ingresar Fecha'}
          autoOk
          margin='none'
          id={id}
          style={{ borderRadius: 6, background: 'white' }}
          keyboardIcon={
            <SvgColor svg={'/assets/svg/icon_calendar.svg'} width={16} colors={['#172b4d']} />
          }
          KeyboardButtonProps={{
            style: { padding: 2, paddingLeft: 8, paddingRight: 8 },
          }}
          // inputProps={{
          //     readOnly: true,
          // }}
          // open={openDatePicker}
          // onClick={ () => setOpenDatePicker(true) }
          // onClose={ () => setOpenDatePicker(false) }
          // disableFuture
        />
      );
      /* return (
        <DatePicker
          disableToolbar
          {...input}
          inputVariant='outlined'
          id={id}
          format='dd/MM/yyyy'
          margin='none'
          label={label}
          size={'small'}
          style={{ borderRadius: 6, background: 'white' }}
          aria-describedby={describedby}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={''}
          error={false}
          // InputAdornmentProps={{
          //     position: 'end',
          // }}
          animateYearScrolling
          autoOk
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SvgColor svg={'/assets/svg/icon_calendar.svg'} width={16} colors={['#172b4d']} />
              </InputAdornment>
            ),
          }}
        />
      ); */
    }
    if (time) {
      return (
        <TimePicker
          disableToolbar
          {...input}
          inputVariant='outlined'
          id={id}
          // format='dd/MM/yyyy'
          margin='none'
          label={label}
          size={'small'}
          style={{ borderRadius: 6, background: 'white' }}
          aria-describedby={describedby}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={''}
          error={false}
          // InputAdornmentProps={{
          //     position: 'end',
          // }}
          autoOk
          // ampm={false}
          showTodayButton
          ampm={false}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SvgColor svg={'/assets/svg/icon_time.svg'} width={16} colors={['#172b4d']} />
              </InputAdornment>
            ),
          }}
        />
      );
    }

    if (radio)
      return (
        <div style={style}>
          <ThemeProvider theme={themes}>
            <RadioGroup
              aria-label={describedby}
              {...input}
              onChange={(event) => input.onChange(event.target.value)}
            >
              {dataSource.map((item, key) => {
                return (
                  <FormControlLabel
                    key={key}
                    value={`${item.value}`}
                    control={<Radio id={id} color='primary' />}
                    label={`${item.label}`}
                  />
                );
              })}
            </RadioGroup>
          </ThemeProvider>
        </div>
      );

    return (
      <OutlinedInput
        id={id}
        {...input}
        label={label}
        type={type}
        aria-describedby={describedby}
        style={{ borderRadius: 6, background: disabled ? 'rgba(0, 0, 0, 0.12)' : 'white' }}
        disabled={disabled}
      />
    );
  }

  // function onComponent() {
  const themes = createMuiTheme({
    palette: {
      primary: orange,
      secondary: red,
    },
  });

  if (checkbox) {
    return (
      <div>
        <ThemeProvider theme={themes}>
          <FormControlLabel
            control={
              <Checkbox
                // checked={input.value ? true : false}
                // onChange={input.onChange}
                checked={input.value || false}
                {...input}
                id={id}
                color='primary'
              />
            }
            label={label}
          />
        </ThemeProvider>
      </div>
    );
  }

  return (
    <ThemeProvider theme={themes}>
      <FormControl error={touched && Boolean(error)} variant={variant} style={style} size={'small'}>
        {!date && !time && !radio && <InputLabel htmlFor={id}>{label}</InputLabel>}
        {radio && <FormLabel htmlFor={id}>{label}</FormLabel>}

        {onAction()}
        {touched && error && (
          <FormHelperText id={describedby} style={{ background: '#FAFAFA' }}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </ThemeProvider>
  );
  // }

  // return <>{onComponent()}</>;
};

C_FORMCONTROL.propTypes = {
  error: PropTypes.any,

  touched: PropTypes.bool,
  select: PropTypes.bool,
  select2: PropTypes.bool,
  date: PropTypes.bool,
  time: PropTypes.bool,
  checkbox: PropTypes.bool,
  disabled: PropTypes.bool,

  variant: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  describedby: PropTypes.string,

  input: PropTypes.object,
  style: PropTypes.object,

  dataSource: PropTypes.array,
};

C_FORMCONTROL.defaultProps = {
  error: false,
  touched: false,
  select: false,
  select2: false,
  date: false,
  time: false,
  checkbox: false,
  disabled: false,

  variant: 'outlined',
  type: 'text',

  id: undefined,
  label: undefined,
  describedby: '',

  input: {},
  style: {},

  dataSource: [],
};

export { C_FORMCONTROL };
