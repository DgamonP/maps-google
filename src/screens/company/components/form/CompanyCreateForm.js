import React from 'react';
import { Grid } from '@material-ui/core';
import { reduxForm } from 'redux-form';

// import { Montserrat } from '../../../../theme/fontFamily';
import { C_FIELD, FormAction } from '../../../../components';
import { setPropsAsInicial } from '../../../../utils/setPropsAsInicial';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'El nombre es requerido';
  }
  if (!values.taxId) {
    errors.taxId = 'El nit es requerido';
  }
  if (!values.address) {
    errors.address = 'La dirección es requerida';
  }
  if (!values.country) {
    errors.country = 'El país es requerido';
  }
  if (!values.city) {
    errors.city = 'La ciudad es requerido';
  }
  if (!values.postalCode) {
    errors.postalCode = 'El código postal es requerido';
  }
  return errors;
};

/* const access = {
  boadingMode: false,
  category: false,
  dispatchType: false,
  companyClient: false,
  measurementUnit: false,
  operation: false,
  place: false,
  stagesTemplate: false,
  task: false,
  typeServices: false,
  typeTransportUnit: false,
  modules: false,
}; */

const countrys = [
  { _id: 'Brasil', name: 'Brasil', value: 'Brasil' },
  { _id: 'Bolivia', name: 'Bolivia', value: 'BoliviaB' },
  { _id: 'Paraguay', name: 'Paraguay', value: 'Paraguay' },
  { _id: 'Chile', name: 'Chile', value: 'Chile' },
  { _id: 'Peru', name: 'Peru', value: 'Peru' },
  { _id: 'Uruguay', name: 'Uruguay', value: 'Uruguay' },
  { _id: 'Argentina', name: 'Argentina', value: 'Argentina' },
  { _id: 'Colombia', name: 'Colombia', value: 'Colombia' },
];

let CompanyCreateForm = (props) => {
  const { handleSubmit, onBack } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'column'}>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='name' label='Nombre' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='taxId' label='Nit' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='address' label='Dirección' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='country' label='País' select2 dataSource={countrys} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='city' label='Ciudad' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='postalCode' label='Código postal' />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
            <C_FIELD
              name='public'
              label='Tipo de empresa'
              radio
              dataSource={[
                { value: true, label: 'Empresa abierta' },
                { value: false, label: 'Empresa Cerrada' },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='public' label='Empresa abierta' checkbox />
          </Grid>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='self' label='Solo para mi flota' checkbox />
          </Grid>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='fms' label='Es empresa FMS' checkbox />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 15 }}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={15}>
              {'Accesos a modulos'}
            </C_TYPOGRAPHY>
          </Grid>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='access.boadingMode' label='Modo de embarque' checkbox />
          </Grid>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='access.category' label='Categoria' checkbox />
          </Grid>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='access.dispatchType' label='Tipo de despacho' checkbox />
          </Grid> */}
        <FormAction onCancel={onBack} />
      </Grid>
    </form>
  );
};

const mapReduxFormData = {
  form: 'companyCreateForm',
  validate,
  enableReinitialize: true,
};

CompanyCreateForm = reduxForm(mapReduxFormData)(CompanyCreateForm);

// const mapStateToProps = (state) => ({});

// const actionCreators = {
//   load: client.load,
// };

CompanyCreateForm = setPropsAsInicial(CompanyCreateForm);
export default CompanyCreateForm;

// export default connect(mapStateToProps, actionCreators)(CompanyCreateForm);
