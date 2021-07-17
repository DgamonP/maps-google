import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Delete, PhotoCamera } from '@material-ui/icons';
import React from 'react';
import { C_BUTTON } from '../../../components';
import { Field } from 'redux-form';
import {
  FormControl,
  FormHelperText,
  Grid,
  Button,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import { renderField } from './RenderField';
import { RenderResourceItem } from './RenderResourceItem';
export const RenderResources = ({ fields, meta: { touched, error, submitFailed } }) => {
  
  return (
    <div>
      <C_BUTTON
        fullWidth={false}
        type='button'
        textTransform={false}
        variant='contained'
        onClick={() => fields.push({})}
        style={{
          marginBottom: 19,
          background: 'transparent',
          color: '#707070',
          border: '2px solid #707070',
          marginRight: 23,
          borderRadius: 14,
        }}
      >
        Agregar Recurso
      </C_BUTTON>

      {(touched || submitFailed) && error && <span>{error}</span>}
      {fields.map((resource, index) => (
        <div key={index}>
            <RenderResourceItem resource={resource} index={index} fields={fields}></RenderResourceItem>
        </div>
      ))}
    </div>
  );
};
