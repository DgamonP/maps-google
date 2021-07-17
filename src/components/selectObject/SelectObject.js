import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@material-ui/core';

const SelectObject = (props) => {
  return (
    <Select
      label={label}
      id={id}
      // aria-describedby={describedby}
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
};

SelectObject.propTypes = {};

export default SelectObject;
