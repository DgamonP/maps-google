import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { StyleContext } from '../../theme/BaseStyles';
import { Grid, Paper } from '@material-ui/core';
import {
  C_DIALOG,
  C_LOADING,
  C_SUCCESS,
  FormGeneric,
  FormTitle,
  ListGeneric,
} from '../../components';
import { typeService } from '../../state/actions/typeService';

const TypeServices = (props) => {
  // dss5
  const classes = React.useContext(StyleContext);
  const {
    t,
    typeServices,
    data,
    loadingAction,
    success,
    load,
    offSuccess,
    list,
    register,
    update,
    details,
    activateDeactivate,
  } = props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    list();
  }, [list]);

  const onConfirmationData = (data) => {
    // console.log('data ==>', data);
    data._id ? setAction('actualizar') : setAction('crear');
    setPayload(data);
    setOpenConfirm(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    if (payload._id) {
      const { _id: typeServiceId, name } = payload;
      // console.log(payload);
      update(typeServiceId, { name });
    } else {
      register(payload);
    }
  };

  /* const fields = [
    {
      name: 'name',
      label: 'Paquete',
      require: true,
    },
    {
      name: 'abbreviation',
      label: 'Abreviación',
      type: 'select',
      require: true,
      options: [
        { _id: 'SC', name: 'Santa Cruz' },
        { _id: 'CH', name: 'Chuquisaca' },
        { _id: 'LP', name: 'La Paz' },
        { _id: 'CB', name: 'Cochabamba' },
        { _id: 'OR', name: 'Oruro' },
        { _id: 'PT', name: 'Potosí' },
        { _id: 'TJ', name: 'Tarija' },
        { _id: 'BE', name: 'Beni' },
        { _id: 'PD', name: 'Pando' },
      ],
    },
    {
      name: 'invoce',
      label: 'Factura',
      type: 'checkbox',
      require: true,
    },
    {
      name: 'calendar',
      label: 'Calendario',
      type: 'date',
      require: true,
    },
    {
      name: 'price',
      label: 'Precio',
      type: 'number',
      require: true,
    },
  ]; */

  const fields = [
    {
      name: 'name',
      label: 'Nombre',
      require: true,
    },
  ];

  const columns = [
    {
      name: 'Nombre',
      id: 'name',
    },
  ];

  let dataList = [];
  if (typeServices.length > 0) {
    dataList = typeServices.map((item) => ({
      _id: item._id /* de primero */,
      name: item.name,
      enable: item.account.enable /* de ultimo */,
    }));
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} el tipo de servicio?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Tipo de servicio guardado exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </>

        <Grid container direction={'column'}>
          <FormTitle
            title={t('typeService.title')}
            subtitle={{
              inicio: 'Configuración',
              title: t('typeService.title'),
            }}
          />
          <FormGeneric fields={fields} onSubmit={onConfirmationData} data={data} load={load} />
          <ListGeneric
            t={t}
            dataList={dataList}
            columnData={columns}
            details={details}
            activateDeactivate={activateDeactivate}
          />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { typeServices, data, loadingAction, success } = state.typeService;
  return { typeServices, data, loadingAction, success };
};

const actionCreators = {
  load: typeService.load,
  offSuccess: typeService.offSuccess,
  list: typeService.typeServicesList,
  details: typeService.typeServiceDetails,
  register: typeService.typeServiceRegister,
  update: typeService.typeServiceUpdate,
  activateDeactivate: typeService.typeServiceActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(TypeServices));
