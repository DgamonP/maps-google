import React from 'react';
import { Grid } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { reduxForm, FieldArray } from 'redux-form';

// import { client } from '../../../../state/actions';
import { C_FIELD, FormAction, C_BUTTON, C_TYPOGRAPHY } from '../../../../components';
import { setPropsAsInicial } from '../../../../utils/setPropsAsInicial';

const validate = (values) => {
  const errors = {};
  if (!values.countryName) {
    errors.countryName = 'El nombre es requerido';
  }
  if (!values.states || !values.states.length) {
    errors.states = { _error: 'Debe agregar al menos un departamento' };
  } else {
    const statesArrayErrors = [];
    values.states.forEach((state, stateIndex) => {
      const stateErrors = {};
      if (!state || !state.name) {
        stateErrors.name = 'Debe añadir un valor';
        statesArrayErrors[stateIndex] = stateErrors;
      }
    });
    if (statesArrayErrors.length) {
      errors.states = statesArrayErrors;
    }
  }
  return errors;
};

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <>
    {fields.map((state, index) => (
      <Grid key={index} container direction={'row'} justify='space-between'>
        <Grid item xs={12} sm={10}>
          <C_FIELD name={`${state}.name`} label={`Departamento ${index + 1}`} />
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
  const { handleSubmit, onBack } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction={'column'}>
        <Grid item xs={12} sm={6}>
          <C_FIELD name='countryName' label='Nombre' />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FieldArray name='states' component={renderMembers} />
        </Grid>
        <FormAction onCancel={onBack} />
      </Grid>
    </form>
  );
};

const mapReduxFormData = {
  form: 'featureCreateForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
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
