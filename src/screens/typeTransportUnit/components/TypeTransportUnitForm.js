import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';

import { Montserrat } from '../../../theme/fontFamily';
import { C_FIELD, C_TYPOGRAPHY, FormAction } from '../../../components';

const validate = (values) => {
  const errors = {};
  if (!values.description) {
    errors.description = 'Requerido';
  }
  return errors;
};

const addValues = (fields, features) => features.map((item) => fields.push(item));

const Renderitems = ({ fields, features }) => {
  useEffect(() => {
    if (features.length !== fields.length) {
      addValues(fields, features);
    }
  }, [features, fields]);

  return (
    <Grid container item xs={12} sm={6}>
      {fields.map((item, index) => {
        let values = [];
        if (features.length > 0) {
          values = features[index].values;
          values = JSON.parse(JSON.stringify(values).split('"valueQualitative":').join('"name":'));
          values = JSON.parse(JSON.stringify(values).split('"valueQuantitative":').join('"name":'));
          values.unshift({ _id: -1, name: 'Sin valor' });
        }
        return (
          <Grid container direction={'column'} key={index}>
            <Grid container direction={'row'} spacing={2}>
              <Grid item container alignItems='center' xs={12} sm={5}>
                <C_TYPOGRAPHY
                  fontFamily={Montserrat.Bold}
                  style={{ paddingLeft: 5, paddingTop: 20 }}
                  fontSize={14}
                >
                  {features[index].name}
                </C_TYPOGRAPHY>
              </Grid>
              <Grid item xs={12} sm={5}>
                <C_FIELD name={`${item}.value`} label={'Valor'} select2 dataSource={values} />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

const TypeTransportUnitForm = (props) => {
  const { handleSubmit, reset, features, initialValues } = props;
  // console.log('initialValues', initialValues, features);
  if (initialValues !== null) {
    initialValues.currentFeatures.map((item) => {
      // console.log('item', item);
      const currenValue = {
        _id: item.valueId,
        name: item.valueQualitative ? item.valueQualitative : item.valueQuantitative,
      };
      let found = features.find((element) => element._id === item.featuresTransportUnitId);
      const posFeature = features.indexOf(found);
      if (posFeature !== -1) {
        features[posFeature].value = currenValue;
      }
      return item;
    });
  } else {
    features.map((item) => {
      delete item.value;
      return item;
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <Grid item xs={12} sm={6}>
        <C_FIELD name='description' label={'Descripción'} />
      </Grid>
      <FieldArray name='features' component={Renderitems} features={features} />
      <FormAction onCancel={reset} />
    </form>
  );
};

const reduxFormData = {
  form: 'TypeTransportUnitForm',
  validate,
};

const mapStateToProps = (state) => {
  const { features } = state.feature;
  const { data } = state.typeTransportUnit;
  return { features, initialValues: data };
};

export default connect(mapStateToProps, null)(reduxForm(reduxFormData)(TypeTransportUnitForm));
