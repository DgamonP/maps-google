import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Grid } from '@material-ui/core';

import { C_BUTTON, C_DIALOG, C_LOADING, C_SUCCESS } from '../../components';
import { loadOrder } from '../../state/actions';

const LoadOrderActions = (props) => {
  const history = useHistory();
  const { travel, loadingAction, success, loadOrderPublish, postulation } = props;
  const { loadOrderId } = useParams();

  const [openConfirmPublish, setOpenConfirmPublish] = React.useState(false);
  const [selectedPublishAndFinish, setSelectedPublishAndFinish] = React.useState(1);

  function onSubmitPublish(event) {
    event.preventDefault();
    setOpenConfirmPublish(false);
    let publish = true;
    if (selectedPublishAndFinish === 2) {
      publish = false;
    }
    console.log(publish);
    loadOrderPublish(loadOrderId, { publish });
  }

  return (
    <Grid container direction='row' style={{ marginTop: 15 }}>
      <C_LOADING open={loadingAction} />

      <C_DIALOG
        open={openConfirmPublish}
        contentText={
          selectedPublishAndFinish === 1
            ? '¿Estás segur@ que deseas publicar la oportunidad?'
            : '¿Estás segur@ que deseas quitar la publicación de la oportunidad?'
        }
        onClose={() => setOpenConfirmPublish(false)}
        onCancel={() => setOpenConfirmPublish(false)}
        width={320}
        okText={'Sí, confirmar'}
        onSubmit={onSubmitPublish}
      />

      <C_SUCCESS
        open={success}
        contentText={
          selectedPublishAndFinish === 1
            ? 'Oportunidad publicada exitosamente'
            : 'La publicación fue quitada exitosamente'
        }
        onOk={() => {
          props.offSuccess();
        }}
      />

      {travel && !travel.publish && !postulation && (
        <C_BUTTON
          fullWidth={false}
          variant='outlined'
          style={{ marginRight: 8 }}
          onClick={() => {
            setSelectedPublishAndFinish(1);
            setOpenConfirmPublish(true);
          }}
        >
          Publicar
        </C_BUTTON>
      )}
      {/* {travel && travel.publish && postulation && postulation.transportUnitId && (
        <C_BUTTON
          fullWidth={false}
          color={'secondary'}
          variant='outlined'
          style={{ marginRight: 8 }}
          onClick={() => {
            setSelectedPublishAndFinish(2);
            setOpenConfirmPublish(true);
          }}
        >
          Cerrar oportunidad
        </C_BUTTON>
      )}
      {travel && !travel.publish && postulation && postulation.transportUnitId && (
        <C_BUTTON
          fullWidth={false}
          variant='outlined'
          onClick={() => history.push(`/travel/${loadOrderId}/loadingOrder/create`)}
        >
          Crear orden de carga
        </C_BUTTON>
      )} */}
      {postulation && postulation.transportUnitId && (
        <C_BUTTON
          fullWidth={false}
          variant='outlined'
          // onClick={history.push(`/travel/${loadOrderId}/loadingOrder/create`)}
          onClick={() => history.push(`/travel/${loadOrderId}/loadingOrder/create`)}
        >
          Crear orden de carga
        </C_BUTTON>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { travel, loadingAction, success } = state.loadOrder;
  const { postulation } = state.postulation;
  return { travel, loadingAction, success, postulation };
};

const actionCreators = {
  loadOrderPublish: loadOrder.loadOrderPublish,
  offSuccess: loadOrder.offSuccess,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoadOrderActions));
