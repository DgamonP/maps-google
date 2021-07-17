import React, { useEffect } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { reduxForm } from 'redux-form';

import { C_FIELD, FormAction } from '../../../components';
import { loadOrder } from '../../../state/actions';

/* const idSelect = ({ input, options }) => {
  return (
    <select onChange={(event) => input.onChange(event.target.value)} value={input.value}>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}; */

const validate = (values) => {
  const errors = { carrierFreight: {} };
  if (!values.packaging) {
    errors.packaging = 'Requerido';
  }
  if (!values.volumeUnit) {
    errors.volumeUnit = 'Requerido';
  }
  if (!values.volumeUnitValue) {
    errors.volumeUnitValue = 'Requerido';
  }
  if (!values.weightUnit) {
    errors.weightUnit = 'Requerido';
  }
  if (!values.weightUnitValue) {
    errors.weightUnitValue = 'Requerido';
  }
  if (!values.carrierFreight?.freightValue) {
    errors.carrierFreight.freightValue = 'Requerido';
  }
  if (!values.carrierFreight?.typeCurrencyFreightId) {
    errors.carrierFreight.typeCurrencyFreightId = 'Requerido';
  }
  return errors;
};

const LoadingOrderCreateForm = (props) => {
  const { travelId } = useParams();
  const { handleSubmit, load, reset, measurementUnits, postulation } = props;
  const weightUnitType = measurementUnits.filter((item) => item.type === 'Peso');
  const volumeUnitType = measurementUnits.filter((item) => item.type === 'Volumen');
  const currencyFreightType = measurementUnits.filter((item) => item.type === 'Moneda');

  useEffect(() => {
    if (postulation) {
      load(travelId, postulation.freightValue);
    }
  }, [travelId, load, postulation]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'column'}>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='packaging' label='Embalaje' />
        </Grid>
        <Grid container direction={'row'} spacing={2}>
          <Grid item xs={12} sm={3}>
            <C_FIELD name='weightUnitValue' label='Peso' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <C_FIELD
              name='weightUnit'
              label={'Unidad de peso'}
              select2
              dataSource={weightUnitType}
            />
          </Grid>
        </Grid>
        <Grid container direction={'row'} spacing={2}>
          <Grid item xs={12} sm={3}>
            <C_FIELD name='volumeUnitValue' label='Volumen' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <C_FIELD
              name='volumeUnit'
              label={'Unidad de volumen'}
              select2
              dataSource={volumeUnitType}
            />
          </Grid>
        </Grid>
        <Grid container direction={'row'} spacing={2}>
          <Grid item xs={12} sm={3}>
            <C_FIELD name='carrierFreight.freightValue' label='Flete' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <C_FIELD
              name='carrierFreight.typeCurrencyFreightId'
              label='Tipo de moneda'
              select
              contentSelect={currencyFreightType.map((item, key) => {
                return (
                  <MenuItem key={key} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{ position: 'relative', top: 17 }}>
            <C_FIELD name='carrierFreight.invoice' label='Con factura' checkbox />
          </Grid>
        </Grid>
        <FormAction onCancel={reset} />
      </Grid>
    </form>
  );
};

const reduxFormData = {
  form: 'OperationCreateForm',
  validate,
};

const mapStateToProps = (state) => {
  const { measurementUnits } = state.measurementUnit;
  const { postulation } = state.postulation;
  const { data } = state.loadOrder;
  return { initialValues: data, measurementUnits, postulation };
};

const actionCreators = {
  load: loadOrder.loadData,
};

export default connect(
  mapStateToProps,
  actionCreators
)(reduxForm(reduxFormData)(LoadingOrderCreateForm));
