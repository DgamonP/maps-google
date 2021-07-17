import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
// import { green } from '@material-ui/core/colors';

const C_TEXTFIELD = (props) => {
  const {
    disabled,
    error,
    fullWidth,
    label,
    multiline,
    name,
    onChange,
    placeholder,
    required,
    rows,
    rowsMax,
    size,
    style,
    type,
    value,
    variant,
    border,
    fontFamily,
    helperText,
    InputLabelProps,
    onBlur,
    onFocus,
    onDrop,
    onDragStart,
    id,
    search,
  } = props;

  const CssTextField = withStyles((theme) =>
    createStyles({
      root: {
        '& label.Mui-focused': {
          color: 'orange',
          fontFamily: fontFamily,
          borderRadius: 6,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'orange',
          fontFamily: fontFamily,
          borderRadius: 6,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            //   borderColor: 'red',
            fontFamily: fontFamily,
            borderRadius: 6,
            borderColor: !border ? 'transparent' : 'none',
          },
          '&:hover fieldset': {
            borderColor: !border ? 'transparent' : 'orange',
            fontFamily: fontFamily,
            borderRadius: 6,
          },
          '&.Mui-focused fieldset': {
            borderColor: 'orange',
            fontFamily: fontFamily,
            borderRadius: 6,
          },
        },
        fontFamily: 'Montserrat',
        borderRadius: 6,
      },
    })
  )(TextField);

  const existeData = (data) => {
    return typeof data != 'undefined' && data != null;
  };

  function onComponent() {
    
    let styles = { margin: 0, };
    styles = Object.assign(styles, style );

    return (
      <CssTextField
        label={ label }
        name={name}
        id={id}
        variant={variant}
        fullWidth={fullWidth}
        size={size}
        margin='dense'
        style={styles}
        required={required}
        type={type}
        helperText={error && helperText}
        value={value}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        multiline={multiline}
        rowsMax={rowsMax}
        rows={rows}
        InputProps={{
          endAdornment: !existeData(props.suffix) ? null : (
            <InputAdornment position='end'>
              { props.suffix }
            </InputAdornment>
          ),
          startAdornment: (!existeData(props.prefix) && !search) ? null : (
            <InputAdornment position='start'>
              { ( search ) ?  
                <img
                  src='/assets/iconData/icon_search.png'
                  width='18px'
                  height='18px'
                  alt='none'
                /> :
                props.prefix 
              }
            </InputAdornment>
          ),
        }}
        InputLabelProps={InputLabelProps}
        onBlur={onBlur}
        onFocus={onFocus}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onChange={onChange}
      />
    );
  }

  return <>{onComponent()}</>;
};

C_TEXTFIELD.propTypes = {
  label:       PropTypes.string,
  variant:     PropTypes.string,
  size:        PropTypes.string,
  type:        PropTypes.string,
  name:        PropTypes.string,
  placeholder: PropTypes.string,
  fontFamily:  PropTypes.string,

  fullWidth:  PropTypes.bool,
  required:   PropTypes.bool,
  error:      PropTypes.bool,
  disabled:   PropTypes.bool,
  multiline:  PropTypes.bool,
  border:     PropTypes.bool,
  search:     PropTypes.bool,

  InputLabelProps: PropTypes.any,

  rowsMax: PropTypes.number,
  rows:    PropTypes.number,

  value:  PropTypes.any,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  id:     PropTypes.any,

  onChange:    PropTypes.func,
  onBlur:      PropTypes.func,
  onFocus:     PropTypes.func,
  onDrop:      PropTypes.func,
  onDragStart: PropTypes.func,

  helperText: PropTypes.any,

  style: PropTypes.object,
};

C_TEXTFIELD.defaultProps = {
  label:       '',
  variant:     'outlined', //'filled' | 'outlined' | 'standard',
  size:        'small', //'medium' | 'small',
  type:        'text',
  placeholder: '',
  fontFamily:  'Montserrat',

  fullWidth: true,
  required:  false,
  error:     false,
  disabled:  false,
  multiline: false,
  border:    true,
  search:    false,

  rowsMax: 4,
  rows:    3,

  prefix: null,
  suffix: null,

  style: {},
};

export { C_TEXTFIELD };
