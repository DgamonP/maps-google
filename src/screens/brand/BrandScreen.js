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
import { brand } from '../../state/actions';

const BrandScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const {
    t,
    brands,
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
      const { _id, brand } = payload;
      update(_id, { brand });
    } else {
      register(payload);
    }
  };

  const fields = [
    {
      name: 'brand',
      label: 'Nombre',
      require: true,
    },
  ];

  const columns = [
    {
      name: 'Nombre',
      id: 'brand',
    },
  ];

  let dataList = [];
  if (brands.length > 0) {
    dataList = brands.map((item) => ({
      _id: item._id,
      brand: item.brand,
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
            contentText={`¿Estás segur@ que deseas ${action} el marca?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Marca guardada exitosamente'}
            onOk={() => {
              offSuccess();
            }}
          />
        </>
        <Grid container direction={'column'}>
          <FormTitle
            title={'Marca'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Marca',
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
  const { brands, data, loadingAction, success } = state.brand;
  return { brands, data, loadingAction, success };
};

const actionCreators = {
  load: brand.load,
  offSuccess: brand.offSuccess,
  list: brand.brandsList,
  details: brand.brandDetails,
  register: brand.brandRegister,
  update: brand.brandUpdate,
  activateDeactivate: brand.brandActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(BrandScreen));
