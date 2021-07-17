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
import { dispatchType } from '../../state/actions';

const DispatchTypeScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const {
    t,
    dispatchTypes,
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
    data._id ? setAction('actualizar') : setAction('crear');
    setPayload(data);
    setOpenConfirm(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    if (payload._id) {
      const { _id, name } = payload;
      update(_id, { name });
    } else {
      register(payload);
    }
  };

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
  if (dispatchTypes.length > 0) {
    dataList = dispatchTypes.map((item) => ({
      _id: item._id,
      name: item.name,
      enable: item.account.enable,
    }));
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <div>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} el tipo de despacho?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Tipo de despacho guardado exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </div>
        <Grid container direction={'column'}>
          <FormTitle
            title={'Tipo de despacho'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Tipo de despacho',
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
  const { dispatchTypes, data, loadingAction, success } = state.dispatchType;
  return { dispatchTypes, data, loadingAction, success };
};

const actionCreators = {
  load: dispatchType.load,
  offSuccess: dispatchType.offSuccess,
  list: dispatchType.dispatchTypesList,
  details: dispatchType.dispatchTypeDetails,
  register: dispatchType.dispatchTypeRegister,
  update: dispatchType.dispatchTypeUpdate,
  activateDeactivate: dispatchType.dispatchTypeActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(DispatchTypeScreen));
