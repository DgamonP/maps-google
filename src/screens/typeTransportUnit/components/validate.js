const validate = (values) => {
  const errors = {};
  if (!values.description) {
    errors.description = 'Requerido';
  }
  if (!values.features || !values.features.length) {
    errors.features = { _error: 'Se debe ingresar al menos una característica' };
  } else {
    const featuresArrayErrors = [];
    values.features.forEach((feature, featureIndex) => {
      const featureErrors = {};
      if (!feature || !feature.name) {
        featureErrors.name = 'Requerido';
        featuresArrayErrors[featureIndex] = featureErrors;
      }
      if (!feature || !feature.value) {
        featureErrors.value = 'Requerido';
        featuresArrayErrors[featureIndex] = featureErrors;
      }
    });
    if (featuresArrayErrors.length) {
      errors.features = featuresArrayErrors;
    }
  }
  return errors;
};

export default validate;
