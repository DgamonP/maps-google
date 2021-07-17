import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { StyleContext } from '../../theme/BaseStyles';
import { Grid, Paper } from '@material-ui/core';
import {
  C_DIALOG,
  C_LOADING,
  C_SUCCESS,
  C_TYPOGRAPHY,
  FormGeneric,
  ListGeneric,
} from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { measurementUnit } from '../../state/actions/measurementUnit';

const MeasurementUnitScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const {
    t,
    measurementUnits,
    data,
    loadingAction,
    success,
    load,
    offSuccess,
    list,
    register,
    update,
    details,
    activateDesactivate,
  } = props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    list();
  }, [list]);

  const onConfirmationData = (data) => {
    console.log('data ==>', data);
    data._id ? setAction('actualizar') : setAction('crear');
    setPayload(data);
    setOpenConfirm(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    let data = payload;
    if (data._id) {
      const { _id, name, abbreviation, type } = data;
      /* mongo asigna a type(string) el _id del objeto type de data */
      update(_id, { name, abbreviation, type });
    } else {
      register(data);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Nombre',
      require: true,
    },
    {
      name: 'abbreviation',
      label: 'Abreviación',
      require: true,
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      require: true,
      options: [
        { _id: 'Moneda', name: 'Moneda' },
        { _id: 'Volumen', name: 'Volumen' },
        { _id: 'Peso', name: 'Peso' },
      ],
    },
  ];

  const columns = [
    {
      name: 'Nombre',
      id: 'name',
    },
    {
      name: 'Abreviación',
      id: 'abbreviation',
    },
    {
      name: 'Tipo',
      id: 'type',
    },
  ];

  let dataList = [];
  if (measurementUnits.length > 0) {
    dataList = measurementUnits.map((item) => ({
      _id: item._id,
      name: item.name,
      abbreviation: item.abbreviation,
      type: item.type,
      enable: item.account.enable,
    }));
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <C_LOADING open={loadingAction} />

        <C_DIALOG
          open={openConfirm}
          contentText={`¿Estás segur@ que deseas ${action} la unidad de medida?`}
          onClose={() => setOpenConfirm(false)}
          onCancel={() => setOpenConfirm(false)}
          width={320}
          okText={'Sí, confirmar'}
          onSubmit={onSubmit}
        />

        <C_SUCCESS
          open={success}
          contentText={'Unidad de medida guardado exitosamente'}
          onOk={() => {
            offSuccess();
          }}
        />

        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              Unidades de medidas
            </C_TYPOGRAPHY>
          </Grid>
          <Grid item xs={12}>
            <FormGeneric fields={fields} onSubmit={onConfirmationData} data={data} load={load} />
          </Grid>
          <Grid item xs={12}>
            <ListGeneric
              t={t}
              dataList={dataList}
              columnData={columns}
              details={details}
              activateDesactivate={activateDesactivate}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { measurementUnits, data, loadingAction, success } = state.measurementUnit;
  return { measurementUnits, data, loadingAction, success };
};

const actionCreators = {
  load: measurementUnit.load,
  offSuccess: measurementUnit.offSuccess,
  list: measurementUnit.measurementUnitsList,
  details: measurementUnit.measurementUnitDetails,
  register: measurementUnit.measurementUnitRegister,
  update: measurementUnit.measurementUnitUpdate,
  activateDesactivate: measurementUnit.measurementUnitActivateDesactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(MeasurementUnitScreen));
