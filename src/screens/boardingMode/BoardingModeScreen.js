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
import { boardingMode } from '../../state/actions';

const BoardingModeScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const {
    t,
    boardingModes,
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
    // console.log(payload);
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
  if (boardingModes.length > 0) {
    dataList = boardingModes.map((item) => ({
      _id: item._id,
      name: item.name,
      enable: item.account.enable,
    }));
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} el modo de embarque?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Modo de embarque guardado exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </>
        <Grid container direction={'column'}>
          <FormTitle
            title={'Modo de embarque'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Modo de embarque',
            }}
          />
          <FormGeneric fields={fields} onSubmit={onConfirmationData} data={data} load={load} />
          <Grid item xs={12}>
            <ListGeneric
              t={t}
              dataList={dataList}
              columnData={columns}
              details={details}
              activateDeactivate={activateDeactivate}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { boardingModes, data, loadingAction, success } = state.boardingMode;
  return { boardingModes, data, loadingAction, success };
};

const actionCreators = {
  load: boardingMode.load,
  offSuccess: boardingMode.offSuccess,
  list: boardingMode.boardingModesList,
  details: boardingMode.boardingModeDetails,
  register: boardingMode.boardingModeRegister,
  update: boardingMode.boardingModeUpdate,
  activateDeactivate: boardingMode.boardingModeActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(BoardingModeScreen));
