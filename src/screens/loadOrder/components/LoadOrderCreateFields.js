import React, { useState } from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { Field } from 'redux-form';

import { Montserrat } from '../../../theme/fontFamily';
import { C_BUTTON, C_FIELD, C_TYPOGRAPHY } from '../../../components';




import SimpleTabs from './TabsView';


// const columns = () => [
//   { title: 'CI', id: 'ci' },
//   { title: 'Nombre', id: 'name' },
//   { title: 'Placa', id: 'plate' },
//   { title: '', id: 'selected' },
// ];

export const LoadOrderCreateFields = (props) => {
  const [plate, setPlate] = useState('');

  const handleInput = (event) => {
    setPlate(event.target.value);
  };

  const {
    measurementUnits,
    categories,
    basicTypeTransportUnits,
    places,
    boardingModes,
    setMakers,
    withCarrierAssign,
    transportUnits,
    extraName,
    search,
    icons,
    geoCoding,
    markers,
    fullGeoResults,
    geoFensing,
    address
  } = props;

  const searchCarrier = () => {
    // console.log(plate);verificar placa si esta vacio
    search(plate);
  };

  const [citiesOrigin, setCitiesOrigin] = useState([]);
  const [citiesDestination, setCitiesDestination] = useState([]);

  const currencyFreightType = measurementUnits.filter((item) => item.type === 'Moneda');
  const volumeUnitType = measurementUnits.filter((item) => item.type === 'Volumen');
  const weightUnitType = measurementUnits.filter((item) => item.type === 'Peso');


  return (
    <>
      {/* Detalle de la oportunidad */}

      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={`${extraName}dates.loadingDate`} label='Fecha de carga' date={true} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={`${extraName}dates.deliveryDate`} label='Fecha de descarga' date={true} />
        </Grid>
      </Grid>

      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={`${extraName}volumeUnitValue`} label='Volumen' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD
            name={`${extraName}volumeUnit`}
            label={'Unidad de volumen'}
            select2
            dataSource={volumeUnitType}
          />
        </Grid>
      </Grid>

      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={`${extraName}weightUnitValue`} label='Peso' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD
            name={`${extraName}weightUnit`}
            label={'Unidad de peso'}
            select2
            dataSource={weightUnitType}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <C_FIELD
          name={`${extraName}categoryLoad`}
          label={'Categoría'}
          select2
          dataSource={categories}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <C_FIELD
          name={`${extraName}boardingMode`}
          label={'Embarque'}
          select2
          dataSource={boardingModes}
        />
      </Grid>

      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} sm={3}>
          <C_FIELD
            name={`${extraName}freightValues.clientFreight.freightValue`}
            label='Flete del cliente'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD
            name={`${extraName}freightValues.clientFreight.typeCurrencyFreightId`}
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
            name={`${extraName}freightValues.clientFreight.invoice`}
            label='Con factura'
            checkbox
          />
        </Grid>
      </Grid>

      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={`${extraName}freightValues.freightOffered.value`} label='Flete ofrecido' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD
            name={`${extraName}freightValues.freightOffered.typeCurrencyOfferedId`}
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
            name={`${extraName}freightValues.freightOffered.invoice`}
            label='Con factura'
            checkbox
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <C_FIELD
          name={`${extraName}typeTransportUnitLabel`}
          label={'Unidad de tipo de transporte'}
          select
          contentSelect={basicTypeTransportUnits.map((item, key) => {
            return (
              <MenuItem key={key} value={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
        />
      </Grid>

      {/* Detalle de geolocalización */}

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
            name={`${extraName}origin`}
            label={'Origen'}
            select
            contentSelect={places.map((item) => {

              return item.states.map((data, index) => {
                data.PlaceId = item._id;
                const itemValue = data.name + ', ' + item.countryName;
                return (
                  <MenuItem
                    key={index}
                    value={data}
                    onClick={  (event) => {
                      setCitiesOrigin(data.cities); // data.cities does not exists in the data, so we need to set it manually
                      geoCoding(event.target.outerText, true);
                    }}
                  >
                    {itemValue}
                  </MenuItem>
                );
              });
            })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={`${extraName}directionOrigin`} label={'Dirección'} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <C_FIELD
          name={`${extraName}originCity`}
          label={'Ciudad de origen'}
          select2
          dataSource={citiesOrigin}
        />
      </Grid>

      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} sm={3}>
          <C_FIELD
            name={`${extraName}destination`}
            label={'Destino'}
            select
            contentSelect={places.map((item) => {
              return item.states.map((data, index) => {
                data.PlaceId = item._id;
                const itemValue = data.name + ', ' + item.countryName;
                return (
                  <MenuItem
                    key={index}
                    value={data}
                    onClick={(event) => {
                      setCitiesDestination(data.cities);
                      geoCoding(event.target.outerText, false);
                    }}
                  >
                    {itemValue}
                  </MenuItem>
                );
              });
            })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <C_FIELD name={`${extraName}directionDestination`} label={'Dirección'} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} style={{ marginBottom: 10 }}>
        <C_FIELD
          name={`${extraName}destinationCity`}
          label={'Ciudad de destino'}
          select2
          dataSource={citiesDestination}
        />
      </Grid>

      <Field name={'markers'} value={markers} style={{ display: 'none' }} component={'input'} />
      
      {/* TABS VIEW */}
            
      <SimpleTabs 
        markers={markers}
        geoFencing={geoFensing}
        icons={icons} 
        fullGeoResults={fullGeoResults}
        geoCoding={geoCoding}
        address={address}
        />

      {withCarrierAssign && (
        <div>
          {/* Fields para orden de carga */}
          <Grid item xs={12} style={{ marginTop: 15 }}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={15}>
              {'Detalle de la orden de carga'}
            </C_TYPOGRAPHY>
          </Grid>
          <Grid item xs={12} sm={6}>
            <C_FIELD name={`${extraName}loadingOrder.packaging`} label='Embalaje' />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 15 }}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={15}>
              {'Seleccionar chofer'}
            </C_TYPOGRAPHY>
          </Grid>
          <Grid container alignItems='center' spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Ingrese placa'
                fullWidth
                variant='outlined'
                value={plate}
                onChange={(e) => handleInput(e)}
                size='small'
                style={{ marginTop: 10 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <C_BUTTON fullWidth={false} onClick={() => searchCarrier()} style={{ marginTop: 10 }}>
                Buscar
              </C_BUTTON>
            </Grid>
            {/* <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
                <C_TABLE columns={columns()}>
                  {transportUnits.map((item) => (
                    <TransportUnitItem key={item._id} {...item} />
                  ))}
                </C_TABLE>
              </Grid> */}
            <Grid item xs={12}>
              <C_FIELD
                name={`${extraName}loadingOrder.assignment.transportUnitId`}
                label='Seleccionar chofer'
                radio
                dataSource={transportUnits.map((item) => ({
                  value: item.transportUnitId,
                  label: item.user.documentId + ' - ' + item.user.fullName + ' - ' + item.plate,
                }))}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};


