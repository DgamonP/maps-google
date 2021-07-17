import React, { useState } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { C_FIELD, FormAction } from '../../../components';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Requerido';
  }
  if (!values.countryName) {
    errors.countryName = 'Requerido';
  }
  if (!values.statesName) {
    errors.statesName = 'Requerido';
  }
  return errors;
};

const CityForm = (props) => {
  const { handleSubmit, reset, places } = props;
  const placesEdited = JSON.parse(JSON.stringify(places).split('"countryName":').join('"name":'));
  const [states, setStates] = useState([]);

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <Grid container direction={'column'}>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='name' label='Nombres' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD
            name='countryName'
            label='País'
            select
            contentSelect={placesEdited.map((item, key) => {
              return (
                <MenuItem
                  key={key}
                  value={item.name}
                  onClick={() => {
                    setStates(item.states);
                  }}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD
            name='statesName'
            label='Departamento'
            select
            contentSelect={states.map((item, key) => {
              return (
                <MenuItem key={key} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          />
        </Grid>
        <FormAction onCancel={reset} />
      </Grid>
    </form>
  );
};

const reduxFormData = {
  form: 'CityForm',
  validate,
  enableReinitialize: true,
};

const mapStateToProps = (state) => {
  const { data } = state.city;
  const { places } = state.place;
  return { initialValues: data, places };
};

export default connect(mapStateToProps, null)(reduxForm(reduxFormData)(CityForm));
