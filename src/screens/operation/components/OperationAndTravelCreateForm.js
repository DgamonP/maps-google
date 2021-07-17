import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Grid, MenuItem } from '@material-ui/core';

import { C_FIELD, C_TYPOGRAPHY, FormAction } from '../../../components';
import { Montserrat } from '../../../theme/fontFamily';
import C_MAP from '../../../components/map/map';
import { InfoWindow, Marker } from 'google-maps-react';

const transport = [
  { _id: 'Camión Abierto', name: 'Camión Abierto' },
  { _id: 'Furgón', name: 'Furgón' },
  { _id: 'Baú', name: 'Baú' },
  { _id: 'Trucky', name: 'Trucky' },
  { _id: 'Nissan Condor', name: 'Nissan Condor' },
  { _id: 'Toyota Dyna', name: 'Toyota Dyna' },
  { _id: 'Otro', name: 'Otro' },
];

const validate = (values) => {
  const errors = {
    travel: { dates: {}, freightValues: { clientFreight: {}, freightOffered: {} }, Route: {} },
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
  if (!values.travel?.Route?.origin) {
    errors.travel.Route.origin = 'Requerido';
  }
  if (!values.travel?.directionOrigin) {
    errors.travel.directionOrigin = 'Requerido';
  }
  if (!values.travel?.Route?.destination) {
    errors.travel.Route.destination = 'Requerido';
  }
  if (!values.travel?.directionDestination) {
    errors.travel.directionDestination = 'Requerido';
  }

  return errors;
};

const OperationAndTravelCreateForm = (props) => {
  const { handleSubmit, reset, typeServices, dispatchTypes, places, companies } = props;
  const { measurementUnits, categories, boardingModes, markers, setMakers, withOneTravel } = props;

  const [showingInfoWindow, setShowingInfoWindow] = React.useState(false);
  const [activeMarker, setActiveMarker] = React.useState(null);

  const currencyFreightType = measurementUnits.filter((item) => item.type === 'Moneda');
  const volumeUnitType = measurementUnits.filter((item) => item.type === 'Volumen');
  const weightUnitType = measurementUnits.filter((item) => item.type === 'Peso');

  const addMarker = React.useCallback(
    (event) => {
      const marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMakers([...markers, marker]);
    },
    [markers, setMakers]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'column'}>
        <Grid item xs={12} sm={6}>
          <C_FIELD
            name='companyClientId'
            id={'companyClientId'}
            label='Cliente'
            select={true}
            contentSelect={companies.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD
            name='typeService'
            id={'typeService'}
            label='Tipo de servicio'
            select={true}
            dataSource={typeServices}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='description' label='Descripción' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='comment' label='comment' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='dispatchType' label='Tipo de despacho' select dataSource={dispatchTypes} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD
            name='placeRoute'
            id={'placeRoute'}
            label='Ruta'
            select={true}
            // dataSource={placesChanged}
            contentSelect={places.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.countryName}
                </MenuItem>
              );
            })}
          />
        </Grid>

        {/* desde aqui es oportunidad  */}
        {withOneTravel && (
          <div>
            <Grid item xs={12} style={{ marginTop: 2 }}>
              <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
                Detalle de oportunidad
              </C_TYPOGRAPHY>
            </Grid>
            <Grid container direction={'column'}>
              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <C_FIELD name='travel.dates.loadingDate' label='Fecha de carga' date={true} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <C_FIELD name='travel.dates.deliveryDate' label='Fecha de entrega' date={true} />
                </Grid>
              </Grid>

              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <C_FIELD name='travel.volumeUnitValue' label='Volumen' />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.volumeUnit'
                    label={'Tipo'}
                    select={true}
                    dataSource={volumeUnitType}
                  />
                </Grid>
              </Grid>

              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <C_FIELD name='travel.weightUnitValue' label='Peso' />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.weightUnit'
                    label={'Tipo'}
                    select={true}
                    dataSource={weightUnitType}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <C_FIELD
                  name='travel.categoryLoad'
                  label={'Categoría'}
                  select={true}
                  dataSource={categories}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <C_FIELD
                  name='travel.boardingMode'
                  label={'Embarque'}
                  select
                  dataSource={boardingModes}
                />
              </Grid>

              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.freightValues.clientFreight.freightValue'
                    label='Flete del cliente'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.freightValues.clientFreight.typeCurrencyFreightId'
                    label='Tipo de moneda'
                    select={true}
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
                  <C_FIELD
                    name={'freightValues.clientFreight.invoice'}
                    label='Con factura'
                    checkbox={true}
                  />
                </Grid>
              </Grid>

              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.freightValues.freightOffered.value'
                    label='Flete ofrecido'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.freightValues.freightOffered.typeCurrencyOfferedId'
                    label='Tipo de moneda'
                    select={true}
                    contentSelect={currencyFreightType.map((item) => {
                      return (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ position: 'relative', top: 17 }}>
                  <C_FIELD
                    name={'freightValues.freightOffered.invoice'}
                    label='Con factura'
                    checkbox={true}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <C_FIELD
                  name='travel.typeTransportUnitLabel'
                  label={'typeTransportUnitLabel'}
                  select
                  contentSelect={transport.map((item, key) => {
                    return (
                      <MenuItem key={key} value={item._id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: 15 }}>
                <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={15}>
                  {'Detalle de geolocalización'}
                </C_TYPOGRAPHY>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: 10 }}>
                <C_TYPOGRAPHY variant={'h2'} fontFamily={Montserrat.ExtraLight} fontSize={12}>
                  {
                    'Selecciona en el mapa el punto de carguío (origen) y el punto de descarguío (destino) o ingresa los enlaces de Google Maps.'
                  }
                </C_TYPOGRAPHY>
              </Grid>

              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.Route.origin'
                    label={'Origen'}
                    select
                    contentSelect={places.map((item, key) => {
                      return item.cities.map((data, index) => {
                        data.PlaceId = item._id;
                        data.countryOrigin = item.countryName;
                        data.cityOrigin = data.name;
                        return (
                          <MenuItem key={index} value={data}>
                            {data.name}
                          </MenuItem>
                        );
                      });
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <C_FIELD name='travel.directionOrigin' label={'Dirección'} />
                </Grid>
              </Grid>

              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <C_FIELD
                    name='travel.Route.destination'
                    label={'Destino'}
                    select
                    contentSelect={places.map((item, key) => {
                      return item.cities.map((data, index) => {
                        data.PlaceId = item._id;
                        data.countryDestination = item.countryName;
                        data.cityDestination = data.name;
                        return (
                          <MenuItem key={index} value={data}>
                            {data.name}
                          </MenuItem>
                        );
                      });
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <C_FIELD name='travel.directionDestination' label={'Dirección'} />
                </Grid>
              </Grid>

              {/* <Field
            name={'checkpoints'}
            value={markers}
            style={{ display: 'none' }}
            component={'input'}
          /> */}

              <Grid container direction={'row'}>
                <Grid item sm={6} xs={12}>
                  <C_MAP
                    onClickMarker={(mapProps, map, clickEvent) => {
                      // console.log(mapProps);
                      // console.log(map);
                      // console.log(clickEvent);
                      addMarker(clickEvent);
                      setShowingInfoWindow(false);
                      setActiveMarker(null);
                    }}
                  >
                    {markers.map((item, key) => {
                      return (
                        <Marker
                          position={{ lat: item.lat, lng: item.lng }}
                          title={'position_' + key}
                          name={'position_' + key}
                          key={key}
                          draggable
                          onDragend={(event, map, clickEvent) => {
                            item.lat = clickEvent.latLng.lat();
                            item.lng = clickEvent.latLng.lng();
                            setMakers(markers);
                          }}
                          onClick={(props, marker, e) => {
                            setShowingInfoWindow(true);
                            setActiveMarker(marker);
                          }}
                        ></Marker>
                      );
                    })}

                    <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                      <div>
                        <span style={{ padding: 0, margin: 0 }}>{' Position agregado'}</span>
                      </div>
                    </InfoWindow>
                  </C_MAP>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}

        <FormAction onCancel={reset} />
      </Grid>
    </form>
  );
};

const reduxFormData = {
  form: 'OperationAndTravelCreateForm',
  validate,
};

const mapStateToProps = (state) => {
  const { companies } = state.company;
  const { typeServices } = state.typeService;
  const { dispatchTypes } = state.dispatchType;
  const { places } = state.place;
  const { measurementUnits } = state.measurementUnit;
  const { categories } = state.category;
  const { boardingModes } = state.boardingMode;
  const { typeTransportUnits } = state.typeTransportUnit;
  return {
    companies,
    typeServices,
    dispatchTypes,
    places,
    measurementUnits,
    categories,
    boardingModes,
    typeTransportUnits,
  };
};

export default connect(
  mapStateToProps,
  null
)(reduxForm(reduxFormData)(OperationAndTravelCreateForm));
