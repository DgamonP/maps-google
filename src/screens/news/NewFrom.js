import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import NewCreateForm from './components/form/NewCreateForm';
import { FormTitle, C_LOADING, C_DIALOG, C_SUCCESS } from '../../components';
import { newAccion } from '../../state/actions/new';

const NewFrom = (props) => {
  const { loadingAction, success, offSuccess, details, data, loading, register, update } = props;
  let modifiedData = data;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [action, setAction] = useState('crear');
  const [payload, setPayload] = useState(null);
  let title = 'Crear';
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { newId } = useParams();
  useEffect(() => {
    if (newId) {
      details(newId, []);
    }
  }, [details]);

  if (data) {
    title = 'Actualizar';
    if (data._id === newId) {
      modifiedData = {
        ...data,
      };
    }
    // console.log('DATA ==> ', modifiedData);
  }

  function onBack() {
    history.goBack();
  }

  const onConfirmationData = (data) => {
    data._id ? setAction('actualizar') : setAction('crear');
    setPayload(data);
    setOpenConfirm(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
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
          <FormTitle
            onBack={onBack}
            title={`${title} noticia`}
            subtitle={{
              inicio: 'Noticia',
              accion: `${title} noticia`,
            }}
          />
          <C_LOADING open={loadingAction || loading} />
          <C_DIALOG
            open={openConfirm}
            contentText={`¿Estás segur@ que deseas ${action} la noticia?`}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Noticia guardada exitosamente'}
            onOk={() => {
              offSuccess();
              onBack();
            }}
          />

          {!loading && (
            <NewCreateForm onSubmit={onConfirmationData} onBack={onBack} data={modifiedData} />
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { news, data, loadingAction, loading, success } = state.new;
  return { news, data, loadingAction, loading, success };
};

const actionCreators = {
  load: newAccion.load,
  offSuccess: newAccion.offSuccess,
  list: newAccion.newsList,
  details: newAccion.newDetails,
  register: newAccion.newRegister,
  update: newAccion.newUpdate,
  activateDesactivate: newAccion.newActivateDesactivate,
};
export default connect(mapStateToProps, actionCreators)(withTranslation()(NewFrom));
