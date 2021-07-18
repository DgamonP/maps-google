import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { FormAction } from '../../../components';
import { LoadOrderCreateFields } from './LoadOrderCreateFields';
import { transportUnit } from '../../../state/actions/transportUnit';
import { mapsAction } from '../../../state/actions';

const validate = (values) => {
  const errors = {
    dates: {},
    freightValues: { clientFreight: {}, freightOffered: {} },
    loadingOrder: { assignment: {} },
  };
  if (!values.dates?.loadingDate) {
    errors.dates.loadingDate = 'Requerido';
  }
  if (!values.dates?.deliveryDate) {
    errors.dates.deliveryDate = 'Requerido';
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
  if (!values.categoryLoad) {
    errors.categoryLoad = 'Requerido';
  }
  if (!values.boardingMode) {
    errors.boardingMode = 'Requerido';
  }
  if (!values.freightValues?.clientFreight?.freightValue) {
    errors.freightValues.clientFreight.freightValue = 'Requerido';
  }
  if (!values.freightValues?.clientFreight?.typeCurrencyFreightId) {
    errors.freightValues.clientFreight.typeCurrencyFreightId = 'Requerido';
  }
  if (!values.freightValues?.freightOffered?.value) {
    errors.freightValues.freightOffered.value = 'Requerido';
  }
  if (!values.freightValues?.freightOffered?.typeCurrencyOfferedId) {
    errors.freightValues.freightOffered.typeCurrencyOfferedId = 'Requerido';
  }
  if (!values.typeTransportUnitLabel) {
    errors.typeTransportUnitLabel = 'Requerido';
  }
  if (!values.origin) {
    errors.origin = 'Requerido';
  }
  if (!values.directionOrigin) {
    errors.directionOrigin = 'Requerido';
  }
  if (!values.destination) {
    errors.destination = 'Requerido';
  }
  if (!values.directionDestination) {
    errors.directionDestination = 'Requerido';
  }
  if (!values.loadingOrder?.packaging) {
    errors.loadingOrder.packaging = 'Requerido';
  }
  if (!values.loadingOrder?.assignment?.transportUnitId) {
    errors.loadingOrder.assignment.transportUnitId = 'Requerido';
  }
  return errors;
};

const LoadOrderCreateForm = (props) => {
  const {
    handleSubmit,
    reset,
    measurementUnits,
    categories,
    basicTypeTransportUnits,
    places,
    boardingModes,
    markers,
    withCarrierAssign,
    transportUnits,
    search,
    icons,
    geoCoding,
  } = props;
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <Grid container direction={'column'}>
        {/* Fields de travel */}
        <LoadOrderCreateFields
          measurementUnits={measurementUnits}
          categories={categories}
          basicTypeTransportUnits={basicTypeTransportUnits}
          places={places}
          boardingModes={boardingModes}
          markers={markers}
          withCarrierAssign={withCarrierAssign}
          transportUnits={transportUnits}
          extraName={''}
          search={search}
          icons={icons}
          geoCoding={geoCoding}
        />
        <FormAction onCancel={reset} />
      </Grid>
    </form>
  );
};

const reduxFormData = {
  form: 'LoadOrderCreateForm',
  validate,
};

const mapStateToProps = (state) => {
  const { data } = state.loadOrder;
  const { measurementUnits } = state.measurementUnit;
  const { categories } = state.category;
  const { boardingModes } = state.boardingMode;
  const { basicTypeTransportUnits } = state.basicTypeTransportUnit;
  const { places } = state.place;
  const { transportUnits } = state.transportUnit;
  const { markers, icons } = state.maps;
  
  return {
    initialValues: data,
    measurementUnits,
    categories,
    boardingModes,
    basicTypeTransportUnits,
    places,
    transportUnits,
    markers,
    icons
  };
};

const actionCreators = {
  search: transportUnit.transportUnitSearch,
  geoCoding: mapsAction.geocoding,
};

export default connect(
  mapStateToProps,
  actionCreators
)(reduxForm(reduxFormData)(LoadOrderCreateForm));
