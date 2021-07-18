import { Grid, MenuItem } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { C_FIELD, C_TYPOGRAPHY, FormAction } from '../../../components';
import { transportUnit } from '../../../state/actions';
import { Montserrat } from '../../../theme/fontFamily';
import { LoadOrderCreateFields } from '../../loadOrder/components/LoadOrderCreateFields';
import { mapsAction } from '../../../state/actions';

// 
const validate = (values) => {
  const errors = {
    travel: {
      dates: {},
      freightValues: { clientFreight: {}, freightOffered: {} },
      loadingOrder: { assignment: {} },
    },
  };
  if (!values.companyClientId) {
    errors.companyClientId = 'Requerido';
  }
  if (!values.typeService) {
    errors.typeService = 'Requerido';
  }
  if (!values.description) {
    errors.description = 'Requerido';
  }
  if (!values.dispatchType) {
    errors.dispatchType = 'Requerido';
  }
  if (!values.placeRoute) {
    errors.placeRoute = 'Requerido';
  }
  /* para travel */
  if (!values.travel?.dates?.loadingDate) {
    errors.travel.dates.loadingDate = 'Requerido';
  }
  if (!values.travel?.dates?.deliveryDate) {
    errors.travel.dates.deliveryDate = 'Requerido';
  }
  if (!values.travel?.volumeUnit) {
    errors.travel.volumeUnit = 'Requerido';
  }
  if (!values.travel?.volumeUnitValue) {
    errors.travel.volumeUnitValue = 'Requerido';
  }
  if (!values.travel?.weightUnit) {
    errors.travel.weightUnit = 'Requerido';
  }
  if (!values.travel?.weightUnitValue) {
    errors.travel.weightUnitValue = 'Requerido';
  }
  if (!values.travel?.categoryLoad) {
    errors.travel.categoryLoad = 'Requerido';
  }
  if (!values.travel?.boardingMode) {
    errors.travel.boardingMode = 'Requerido';
  }
  if (!values.travel?.freightValues?.clientFreight?.freightValue) {
    errors.travel.freightValues.clientFreight.freightValue = 'Requerido';
  }
  if (!values.travel?.freightValues?.clientFreight?.typeCurrencyFreightId) {
    errors.travel.freightValues.clientFreight.typeCurrencyFreightId = 'Requerido';
  }
  if (!values.travel?.freightValues?.freightOffered?.value) {
    errors.travel.freightValues.freightOffered.value = 'Requerido';
  }
  if (!values.travel?.freightValues?.freightOffered?.typeCurrencyOfferedId) {
    errors.travel.freightValues.freightOffered.typeCurrencyOfferedId = 'Requerido';
  }
  if (!values.travel?.typeTransportUnitLabel) {
    errors.travel.typeTransportUnitLabel = 'Requerido';
  }
  if (!values.travel?.origin) {
    errors.travel.origin = 'Requerido';
  }
  if (!values.travel?.directionOrigin) {
    errors.travel.directionOrigin = 'Requerido';
  }
  if (!values.travel?.destination) {
    errors.travel.destination = 'Requerido';
  }
  if (!values.travel?.directionDestination) {
    errors.travel.directionDestination = 'Requerido';
  }
  if (!values.travel?.loadingOrder?.packaging) {
    errors.travel.loadingOrder.packaging = 'Requerido';
  }
  if (!values.travel?.loadingOrder?.assignment?.transportUnitId) {
    errors.travel.loadingOrder.assignment.transportUnitId = 'Requerido';
  }
  return errors;
};

const OperationCreateForm = (props) => {
  const {
    handleSubmit,
    reset,
    typeServices,
    dispatchTypes,
    places,
    companies,
    withOneTravel,
    measurementUnits,
    categories,
    boardingModes,
    basicTypeTransportUnits,
    transportUnits,
    withCarrierAssign,
    markers,
    setMakers,
    search,
    icons,
    geoCoding,
    fullGeoResults,
    geoFensing,
    address
  } = props;
  const placesEdited = JSON.parse(JSON.stringify(places).split('"countryName":').join('"name":'));

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'column'}>
        <Grid item xs={12} sm={6}>
          {/* <C_FIELD
            name='companyClientId'
            label='Cliente'
            select={true}
            contentSelect={companies.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          /> */}
          <C_FIELD name='companyClientId' label='Cliente' select2 dataSource={companies} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='typeService' label='Tipo servicio' select2 dataSource={typeServices} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='description' label='Descripción' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='comment' label='Comentario' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='dispatchType' label='Tipo despacho' select2 dataSource={dispatchTypes} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='placeRoute' label='Ruta' select2 dataSource={placesEdited} />
        </Grid>
        {withOneTravel && (
          <div>
            <Grid item xs={12} style={{ marginTop: 15 }}>
              <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
                Detalle de la oportunidad
              </C_TYPOGRAPHY>
            </Grid>
            {/* Create Fields */}
            <LoadOrderCreateFields
              measurementUnits={measurementUnits}
              categories={categories}
              basicTypeTransportUnits={basicTypeTransportUnits}
              places={places}
              boardingModes={boardingModes}
              markers={markers}
              setMakers={setMakers}
              withCarrierAssign={withCarrierAssign}
              transportUnits={transportUnits}
              extraName={'travel.'}
              search={search}
              icons={icons}
              geoCoding={geoCoding}
              fullGeoResults={fullGeoResults}
              geoFensing={geoFensing}
              address={address}
            />
          </div>
        )}
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
  const { data } = state.operation;
  const { companies } = state.company;
  const { typeServices } = state.typeService;
  const { dispatchTypes } = state.dispatchType;
  const { places } = state.place;
  /* para travel */
  const { measurementUnits } = state.measurementUnit;
  const { categories } = state.category;
  const { boardingModes } = state.boardingMode;
  const { basicTypeTransportUnits } = state.basicTypeTransportUnit;
  const { transportUnits } = state.transportUnit;
  const { icons } = state.maps;
  return {
    initialValues: data,
    companies,
    typeServices,
    dispatchTypes,
    places,
    measurementUnits,
    categories,
    boardingModes,
    basicTypeTransportUnits,
    transportUnits,
    icons,
  };
};

const actionCreators = {
  search: transportUnit.transportUnitSearch,
  geoCoding: mapsAction.geocoding,
  geoFensing: mapsAction.geofencing,
};

export default connect(
  mapStateToProps,
  actionCreators
)(reduxForm(reduxFormData)(OperationCreateForm));
