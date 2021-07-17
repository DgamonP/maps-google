import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { C_DIALOG, C_LOADING, C_SUCCESS, FormTitle } from '../../components';
import { StyleContext } from '../../theme/BaseStyles';
import { feature, typeTransportUnit } from '../../state/actions';
import TypeTransportUnitForm from './components/TypeTransportUnitForm';

const TypeTransportUnitUpdate = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { typeTransportUnitId } = useParams();
  const { typeTransportUnit, loadingAction, success, offSuccess, featuresList, loadData, update } =
    props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [acceptedData, setAcceptedData] = useState(null);

  useEffect(() => {
    featuresList();
    loadData(typeTransportUnitId, typeTransportUnit);
  }, [featuresList, typeTransportUnitId, typeTransportUnit, loadData]);

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
    update(typeTransportUnitId, acceptedData);
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas actualizar el tipo de unidad de transporte?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Tipo de unidad de transporte actualizado exitosamente'}
            onOk={() => {
              offSuccess();
              history.goBack();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Actualizar tipo de unidad de transporte'}
            subtitle={{
              inicio: 'Tipo de unidad de transporte',
              accion: 'Actualizar tipo de unidad de transporte',
            }}
          />
          <TypeTransportUnitForm onSubmit={onConfirmationData} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { typeTransportUnit, loadingAction, success } = state.typeTransportUnit;
  return { typeTransportUnit, loadingAction, success };
};

const actionCreators = {
  featuresList: feature.featuresList,
  offSuccess: typeTransportUnit.offSuccess,
  update: typeTransportUnit.typeTransportUnitUpdate,
  loadData: typeTransportUnit.typeTransportUnitsLoadData,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(TypeTransportUnitUpdate));
