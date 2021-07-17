import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { FieldArray, reduxForm } from 'redux-form';

import { Montserrat } from '../../../theme/fontFamily';
import { C_FIELD, C_TYPOGRAPHY, FormAction } from '../../../components';

const renderitems = ({ fields, roles }) => {
  return (
    <Grid container direction={'column'}>
      {fields.map((item, index) => {
        return (
          <Grid container spacing={1} key={index}>
            <Grid item container justify='flex-start' alignItems='center' xs={12} sm={3}>
              <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Medium} fontSize={14}>
                {roles[index].name}
              </C_TYPOGRAPHY>
            </Grid>
            <Grid item xs={12} sm={2}>
              <C_FIELD name={`${item}.read`} label='Lectura' checkbox />
            </Grid>
            <Grid item xs={12} sm={2}>
              <C_FIELD name={`${item}.write`} label='Escritura' checkbox />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

const OperatorRolesForm = (props) => {
  const { handleSubmit, reset, operator } = props;
  if (!operator) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
      <Grid container direction={'column'}>
        <FieldArray name='roles' component={renderitems} roles={operator.roles} />
        <FormAction onCancel={reset} />
      </Grid>
    </form>
  );
};

const mapReduxFormData = {
  form: 'operatorRolesForm',
  enableReinitialize: true,
};

const mapStateToProps = (state) => {
  const { data, operator } = state.operator;
  return { initialValues: data, operator };
};

export default connect(mapStateToProps, null)(reduxForm(mapReduxFormData)(OperatorRolesForm));
