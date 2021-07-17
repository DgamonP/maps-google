import React from 'react';
import { Grid } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { reduxForm, FieldArray } from 'redux-form';

// import { client } from '../../../../state/actions';
import { C_FIELD, FormAction, C_BUTTON, C_TYPOGRAPHY } from '../../../../components';
import { setPropsAsInicial } from '../../../../utils/setPropsAsInicial';

// const data = {
//   name: 'operador 1',
// };

const validate = (values) => {
  const errors = {};
  if (!values.typeFeature) {
    errors.typeFeature = 'El tipo de característica es requerido';
  }

  if (!values.name) {
    errors.name = 'El nombre es requerido';
  }

  if (!values.values || !values.values.length) {
    errors.values = { _error: 'Debe agragar al menos un valor' };
  } else {
    const valuesArrayErrors = [];
    values.values.forEach((value, valueIndex) => {
      const valueErrors = {};
      if (!value || !value.value) {
        valueErrors.value = 'Debe añadir un valor';
        valuesArrayErrors[valueIndex] = valueErrors;
      } else if (values.typeFeature === 'Quantitative' && isNaN(parseInt(value.value))) {
        valueErrors.value = 'El valor debe ser número';
        valuesArrayErrors[valueIndex] = valueErrors;
      }
    });
    if (valuesArrayErrors.length) {
      errors.values = valuesArrayErrors;
    }
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  return warnings;
};

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <>
    {fields.map((value, index) => (
      <Grid key={index} container direction={'row'} justify='space-between'>
        <Grid item xs={12} sm={10}>
          <C_FIELD name={`${value}.value`} label='Valor' />
        </Grid>
        <Grid item xs={12} sm={2} style={{ textAlign: 'right' }}>
          <C_BUTTON
            size='medium'
            fullWidth={false}
            onClick={() => {
              fields.remove(index);
              // fields = fields.filter((data) => data._id !== item._id)
            }}
            color={'secondary'}
            style={{ position: 'relative', top: 20 }}
          >
            <Delete size='small' />
          </C_BUTTON>
        </Grid>
      </Grid>
    ))}
    <Grid item xs={12} sm={2}>
      <C_BUTTON
        fullWidth={false}
        onClick={() => fields.push({})}
        color={'primary'}
        style={{ position: 'relative', top: 20 }}
      >
        Adicionar
      </C_BUTTON>
    </Grid>
    <Grid item xs={12} sm={12}>
      {submitFailed && error && (
        <C_TYPOGRAPHY
          variant={'caption'}
          style={{ color: '#f44336', marginTop: '20px', marginLeft: '14px', marginRight: '14px' }}
          fontFamily={'Helvetica'}
          fontWeight={'400'}
        >
          {error}
        </C_TYPOGRAPHY>
      )}
    </Grid>
    <br />
  </>
);

let FeatureCreateForm = (props) => {
  const { handleSubmit, load, onBack, reset, submitting } = props;

  // useEffect(() => {
  //   load(data);
  // }, [load]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'column'}>
          <Grid item xs={12} sm={6}>
            <C_FIELD name='name' label='Nombre' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <C_FIELD
              name='typeFeature'
              label='Tipo de Característica'
              radio
              dataSource={[
                { value: 'Quantitative', label: 'Cuantitativo' },
                { value: 'Qualitative', label: 'Cualitativo' },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <C_FIELD
              name='requireForCarrier'
              label='Obligario para el registro del chófer.'
              checkbox
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FieldArray name='values' component={renderMembers} />
          </Grid>
          <FormAction onCancel={onBack} />
        </Grid>
      </form>
    </>
  );
};

const mapReduxFormData = {
  form: 'featureCreateForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
  enableReinitialize: true,
};

FeatureCreateForm = reduxForm(mapReduxFormData)(FeatureCreateForm);

// const mapStateToProps = (state) => ({});

// const actionCreators = {
//   load: client.load,
// };

FeatureCreateForm = setPropsAsInicial(FeatureCreateForm);
export default FeatureCreateForm;

// export default connect(mapStateToProps, actionCreators)(FeatureCreateForm);
