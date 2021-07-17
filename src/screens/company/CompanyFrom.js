import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { company } from '../../state/actions';
import CompanyCreateForm from './components/form/CompanyCreateForm';

const CompanyFrom = (props) => {
  const classes = React.useContext(StyleContext);
  const { companyId } = useParams();
  const { loadingAction, success, offSuccess, details, data, loading, register, update } = props;

  let title = 'Crear';
  let modifiedData = data;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (companyId) {
      details(companyId, []);
    }
  }, [companyId, details]);

  if (data) {
    title = 'Actualizar';
    if (data._id === companyId) {
      // modifiedData = {
      //   ...data,
      //   public: data.public.toString(),
      // };
      modifiedData = {
        ...data,
      };
    }
  }

  function onBack() {
    history.goBack();
  }

  const onConfirmation = (data) => {
    // console.log('data ==>', data);
    data._id ? setAction('actualizar') : setAction('crear');
    setPayload(data);
    setOpenConfirm(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    // data.public = data.public === 'true';
    if (payload._id) {
      update(payload._id, payload);
    } else {
      register(payload);
    }
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>
          <>
            <C_LOADING open={loadingAction || loading} />
            <C_DIALOG
              open={openConfirm}
              contentText={`¿Estás segur@ que deseas ${action} la empresa?`}
              onClose={() => setOpenConfirm(false)}
              onCancel={() => setOpenConfirm(false)}
              width={320}
              okText={'Sí, confirmar'}
              onSubmit={onSubmit}
            />
            <C_SUCCESS
              open={success}
              contentText={'Empresa guardada exitosamente'}
              onOk={() => {
                offSuccess();
                onBack();
              }}
            />
          </>
          {!loading && (
            <>
              <FormTitle
                onBack={onBack}
                title={`${title} empresa`}
                subtitle={{
                  inicio: 'Empresa',
                  accion: `${title} empresa`,
                }}
              />
              <CompanyCreateForm onSubmit={onConfirmation} onBack={onBack} data={modifiedData} />
            </>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { companies, data, loadingAction, loading, success } = state.company;
  return { companies, data, loadingAction, loading, success };
};

const actionCreators = {
  load: company.load,
  offSuccess: company.offSuccess,
  details: company.companyDetails,
  register: company.companyRegister,
  update: company.companyUpdate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(CompanyFrom));
