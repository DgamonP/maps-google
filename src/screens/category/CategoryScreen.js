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
import { category } from '../../state/actions';

const CategoryScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const {
    t,
    categories,
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
      const { _id: categoryId, name } = data;
      // console.log(payload);
      update(categoryId, { name });
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
  if (categories.length > 0) {
    dataList = categories.map((item) => ({
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
            contentText={`¿Estás segur@ que deseas ${action} la categoría?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Categoría guardada exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </>
        <Grid container direction={'column'}>
          <FormTitle
            title={'Categoría'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Categoría',
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
  const { categories, data, loadingAction, success } = state.category;
  return { categories, data, loadingAction, success };
};

const actionCreators = {
  load: category.load,
  offSuccess: category.offSuccess,
  list: category.categoriesList,
  details: category.categoryDetails,
  register: category.categoryRegister,
  update: category.categoryUpdate,
  activateDeactivate: category.categoryActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(CategoryScreen));
