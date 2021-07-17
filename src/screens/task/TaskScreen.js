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
import { task } from '../../state/actions/task';

const Tasks = (props) => {
  // dss5
  const classes = React.useContext(StyleContext);
  const {
    t,
    tasks,
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
    let data = payload;
    if (data._id) {
      const { _id: taskId, name } = data;
      // console.log(payload);
      update(taskId, { name });
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
  ];

  const columns = [
    {
      name: 'Nombre',
      id: 'name',
    },
  ];

  let dataList = [];
  if (tasks.length > 0) {
    dataList = tasks.map((item) => ({
      _id: item._id /* de primero */,
      name: item.name,
      enable: item.account.enable /* de ultimo */,
    }));
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <C_LOADING open={loadingAction} />

        <C_DIALOG
          open={openConfirm}
          contentText={`¿Estás segur@ que deseas ${action} la tarea?`}
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

        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              {t('task.title')}
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
              activateDesactivate={activateDeactivate}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { tasks, data, loadingAction, success } = state.task;
  return { tasks, data, loadingAction, success };
};

const actionCreators = {
  load: task.load,
  offSuccess: task.offSuccess,
  list: task.tasksList,
  details: task.taskDetails,
  register: task.taskRegister,
  update: task.taskUpdate,
  activateDeactivate: task.taskActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(Tasks));
