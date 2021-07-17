import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  Button,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { client } from '../../../state/actions';
import { C_BUTTON, C_FIELD } from '../../../components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import IconButton from '@material-ui/core/IconButton';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Delete, PhotoCamera } from '@material-ui/icons';
import { RenderResources } from './RenderResources';
import { renderField } from '../../operator/components/RenderField';
import { renderFieldSelectCountry } from '../../../components/input/renderFieldSelectCountry';
import { renderFieldSelectStates } from '../../../components/input/renderFieldSelectStates';

const data = {
  name: 'operador 1',
};
const states = [
  { value: 'SC', label: 'Santa Cruz' },
  { value: 'CH', label: 'Chuquisaca' },
  { value: 'LP', label: 'La Paz' },
  { value: 'CB', label: 'Cochabamba' },
  { value: 'OR', label: 'Oruro' },
  { value: 'PT', label: 'Potosí' },
  { value: 'TJ', label: 'Tarija' },
  { value: 'BE', label: 'Beni' },
  { value: 'PD', label: 'Pando' },
];
const countrys = [
  { value: 'BR', label: 'Brasil' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'CH', label: 'Chile' },
  { value: 'PE', label: 'Peru' },
  { value: 'URU', label: 'Uruguay' },
  { value: 'ARG', label: 'Argentina' },
  { value: 'CO', label: 'Colombia' },
];
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Requerido';
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  return warnings;
};

const renderDirections = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    <C_BUTTON
      fullWidth={false}
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
      Agregar Direccion
    </C_BUTTON>

    {(touched || submitFailed) && error && <span>{error}</span>}
    {fields.map((member, index) => (
      <div key={index}>
        <Card style={{ paddingBottom: 5, marginBottom: 15 }}>
          <CardContent>
            <Typography style={{ fontSize: 16 }}>Direccion #{index + 1}</Typography>

            <Grid container direction={'row'}>
              <C_FIELD name='states' label='Departamentos' select={true} dataSource={states} />
              <C_FIELD name='country' label='Pais' select={true} dataSource={countrys} />
              <C_FIELD name='street' type='text' label='Calle' />
              <C_FIELD name='city' type='text' label='Ciudad' />
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              type='button'
              title='Remover Direccion'
              onClick={() => fields.remove(index)}
              size='small'
            >
              <Delete /> Eliminar Direccion
            </Button>
          </CardActions>
        </Card>
      </div>
    ))}
  </div>
);

let ClientUpdateForm = (props) => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  const [selectedDate, setSelectedDate] = React.useState(moment());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  useEffect(() => {
    load(data);
  }, [load]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* "birthDate": "Fecha de Cumpleaños", "companyId": "Empresa", "country": "Pais", "city":
        "Ciudad", "states": "Departamento", "postalCode": "código postal" */}
        <Grid container direction={'column'}>
          <Grid container spacing={3} direction={'row'}>
            <Grid item xs={12} sm={4}>
              <C_FIELD name='firstName' type='text' label='Nombre' />
            </Grid>
            <Grid item xs={12} sm={8}>
              <C_FIELD name='lastName' type='text' label='Apellido' />
            </Grid>
          </Grid>

          <Grid container spacing={3} direction={'row'}>
            <Grid item xs={12} sm={4}>
              <C_FIELD name='documentId' type='text' label='Carnet de identidad' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <C_FIELD name='documentId_extend' select={true} dataSource={states} label='Lugar' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <C_FIELD name='birthDate' date={true} label='Fecha' />
            </Grid>
          </Grid>

          <C_FIELD name='email' type='email' label='Correo electrónico' />

          <Typography style={{ fontSize: 18, marginBottom: 19, marginTop: 19 }} variant='h3'>
            Direcciones
          </Typography>
          <FieldArray name='members' component={renderDirections} />
          <Typography style={{ fontSize: 18, marginBottom: 19 }} variant='h3'>
            Recursos
          </Typography>
          <FieldArray name='resources' component={RenderResources} />

          <Grid container direction={'row'}>
            <C_BUTTON
              fullWidth={false}
              variant='contained'
              onClick={reset}
              style={{
                marginTop: 19,
                background: 'transparent',
                color: '#707070',
                border: '2px solid #707070',
                marginRight: 23,
                borderRadius: 14,
              }}
            >
              Cancelar
            </C_BUTTON>
            <C_BUTTON
              fullWidth={false}
              type='submit'
              disabled={submitting}
              variant='contained'
              style={{ marginTop: 19, background: '#EC8105 ', borderRadius: 14 }}
            >
              Continuar
            </C_BUTTON>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ClientUpdateForm = reduxForm({
  form: 'clientUpdateForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(ClientUpdateForm);

ClientUpdateForm = connect(
  (state) => ({
    initialValues: state.client.data,
  }),
  { load: client.load }
)(ClientUpdateForm);

export default ClientUpdateForm;
