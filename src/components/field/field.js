import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';
import { C_FORMCONTROL } from '../formControl';

const renderField = (props) => {
  const {
    dataSource,
    contentSelect,
    date,
    time,
    input,
    label,
    select,
    select2,
    id,
    type,
    checkbox,
    radio,
    disabled,
    meta: { touched, error },
  } = props;

  return (
    <C_FORMCONTROL
      style={checkbox ? {} : { marginTop: 20, width: '100%' }}
      input={input}
      error={error}
      label={label}
      id={id}
      type={type}
      describedby={label.replace(' ', '-') + '-error-text'}
      touched={touched}
      select={select}
      select2={select2}
      date={date}
      time={time}
      dataSource={dataSource}
      checkbox={checkbox}
      radio={radio}
      disabled={disabled}
      contentSelect={contentSelect}
    />
  );
};

const C_FIELD = (props) => {
  const {
    checkbox,
    radio,
    contentSelect,
    dataSource,
    date,
    time,
    disabled,
    id,
    label,
    name,
    select,
    select2,
    type,
    autocomplete,
  } = props;

  // if ( checkbox ) {
  //   return (
  //     <Field
  //       name={name}
  //       label={label}
  //       // checked={!!props.value}
  //       component={C_CHECKBOX}
  //       // onChange={ props.onChange }
  //     />
  //   );
  // };

  // function onComponent() {
  return (
    <Field
      name={name}
      type={type}
      component={renderField}
      label={label}
      select={select}
      select2={select2}
      date={date}
      time={time}
      dataSource={dataSource}
      contentSelect={contentSelect}
      checkbox={checkbox}
      radio={radio}
      disabled={disabled}
      id={id}
      autoComplete={autocomplete}
    />
  );
  // }

  // return <>{onComponent()}</>;
};

C_FIELD.propTypes = {
  name: PropTypes.any,
  id: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,

  select: PropTypes.bool,
  select2: PropTypes.bool,
  date: PropTypes.bool,
  time: PropTypes.bool,
  checkbox: PropTypes.bool,
  radio: PropTypes.bool,
  disabled: PropTypes.bool,

  autoComplete: PropTypes.string,

  dataSource: PropTypes.array,

  contentSelect: PropTypes.node,
};

C_FIELD.defaultProps = {
  name: '',
  type: 'text',
  label: '',

  select: false,
  select2: false,
  date: false,
  time: false,
  checkbox: false,
  radio: false,
  disabled: false,

  dataSource: [],
};

export { C_FIELD };
