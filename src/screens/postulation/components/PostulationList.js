import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { withTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';

import { StyleContext } from '../../../theme/BaseStyles';
import { C_DIALOG, C_LOADING, C_SUCCESS, C_TABLE, ScreenTitle } from '../../../components';

import PostulationItem from './PostulationItem';
import { postulation } from '../../../state/actions';

const PostulationList = (props) => {
  const classes = React.useContext(StyleContext);
  const { postulations, loadingAction, list, success, postulation } = props;
  const { loadOrderId } = useParams();

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [_id, setId] = React.useState(null);
  const [travelId, setTravelId] = React.useState(null);

  useEffect(() => {
    list(loadOrderId);
  }, [loadOrderId, list]);

  function createColumn(title, id, numeric = false) {
    return { id, title };
  }

  function columns() {
    let array = [
      createColumn('Fecha', 'date'),
      createColumn('Nombre', 'name'),
      createColumn('U. Transporte', 'unittransport'),
      createColumn('Ciudad', 'city'),
      createColumn('Calificación', 'qualification'),
      createColumn('Oferta', 'freightValue'),
      createColumn('Estado', 'state'),
    ];
    if (!postulation) {
      array.push(createColumn('Acción', 'action'));
    }
    return array;
  }

  function acceptPostulation(_id, travelId) {
    setId(_id);
    setTravelId(travelId);
    setOpenConfirm(true);
  }

  function onSubmit(event) {
    event.preventDefault();
    setOpenConfirm(false);
    props.postulationAccept(_id, travelId);
  }

  return (
    <div className={classes.mainHome}>
      <C_LOADING open={loadingAction} />

      <C_DIALOG
        open={openConfirm}
        contentText={'¿Estás segur@ que deseas aceptar?'}
        onClose={() => setOpenConfirm(false)}
        onCancel={() => setOpenConfirm(false)}
        width={320}
        okText={'Sí, confirmar'}
        onSubmit={onSubmit}
      />

      <C_SUCCESS
        open={success}
        contentText={'Postulante aceptado exitosamente'}
        onOk={() => {
          props.offSuccess();
        }}
      />

      <Paper
        className={classes.mainRoot}
        style={{ padding: 0, paddingTop: 5, paddingBottom: 5 }}
        elevation={0}
      >
        <ScreenTitle title={'Postulantes'} create={false} />
        <Paper elevation={1} className={classes.paper_table} style={{ marginTop: 15 }}>
          <C_TABLE columns={columns()}>
            {postulations.map((item, key) => {
              return (
                <PostulationItem key={key} {...item} onAcceptPostulation={acceptPostulation} />
              );
            })}
          </C_TABLE>
        </Paper>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { postulation, postulations, loadingAction, success } = state.postulation;
  return { postulation, postulations, loadingAction, success };
};

const actionCreators = {
  list: postulation.postulationsList,
  postulationAccept: postulation.postulationAccept,
  offSuccess: postulation.offSuccess,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(PostulationList));

// export default React.memo(PostulationList);
