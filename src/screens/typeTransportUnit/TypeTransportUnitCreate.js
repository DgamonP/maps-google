import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { C_DIALOG, C_LOADING, C_SUCCESS, FormTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import { feature, typeTransportUnit } from '../../state/actions';
import TypeTransportUnitForm from './components/TypeTransportUnitForm';

const TypeTransportUnitCreate = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { loadingAction, success, offSuccess, featuresList, register } = props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [acceptedData, setAcceptedData] = useState(null);

  useEffect(() => {
    featuresList();
  }, [featuresList]);

  function onBack() {
    history.goBack();
  }

  function onConfirmationData(data) {
    // console.log(data);
    setAcceptedData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    register(acceptedData);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas crear el tipo de unidad de transporte?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Tipo de unidad de transporte creada exitosamente'}
            onOk={() => {
              offSuccess();
              history.goBack();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Crear tipo de unidad de transporte'}
            subtitle={{
              inicio: 'Tipo de unidad de transporte',
              accion: 'Crear tipo de unidad de transporte',
            }}
          />
          <TypeTransportUnitForm onSubmit={onConfirmationData} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loadingAction, success } = state.typeTransportUnit;
  return { loadingAction, success };
};

const actionCreators = {
  featuresList: feature.featuresList,
  offSuccess: typeTransportUnit.offSuccess,
  register: typeTransportUnit.typeTransportUnitRegister,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(TypeTransportUnitCreate));
