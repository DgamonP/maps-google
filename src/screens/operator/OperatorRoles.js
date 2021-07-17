import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';

import { operator } from '../../state/actions';
import { C_DIALOG, C_LOADING, C_SUCCESS, C_TYPOGRAPHY, FormTitle } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { StyleContext } from '../../theme/BaseStyles';
import OperatorRolesForm from './components/OperatorRolesForm';

const OperatorRoles = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { operatorId } = useParams();
  const { userId, operators, operator, loadingAction, success, details, update, offSuccess } =
    props;
  const { profile } = operator || {};

  const [openConfirm, setOpenConfirm] = useState(false);
  const [operatorData, setOperatorData] = useState(null);

  useEffect(() => {
    details(operatorId, operators);
  }, [details, operatorId, operators]);
  /* if (operator === null) {
    details(operatorId, operators);
  } */

  function onBack() {
    history.goBack();
  }

  function onConfirmationData(data) {
    setOperatorData(data);
    setOpenConfirm(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenConfirm(false);
    update(operatorId, operatorData, userId);
  };

  let name = profile && profile.firstName ? profile.firstName : '';
  name += profile && profile.lastName ? ' ' + profile.lastName : '';

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <>
          <C_LOADING open={loadingAction} />
          <C_DIALOG
            open={openConfirm}
            contentText={'¿Estás segur@ que deseas editar los roles?'}
            onClose={() => setOpenConfirm(false)}
            onCancel={() => setOpenConfirm(false)}
            width={320}
            okText={'Sí, confirmar'}
            onSubmit={onSubmit}
          />
          <C_SUCCESS
            open={success}
            contentText={'Roles guardados exitosamente'}
            onOk={() => {
              offSuccess();
              onBack();
            }}
          />
        </>
        <Grid container direction={'column'}>
          <FormTitle
            onBack={onBack}
            title={'Roles del operador'}
            subtitle={{
              inicio: 'Configuración',
              title: 'Operador',
              title2: 'Roles del operador',
            }}
          />
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={18}>
              {name}
            </C_TYPOGRAPHY>
          </Grid>
          <OperatorRolesForm onSubmit={onConfirmationData} onBack={onBack} />
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userId } = state.auth;
  const { operators, operator, loadingAction, success } = state.operator;
  return { userId, operators, operator, loadingAction, success };
};

const actionCreators = {
  update: operator.operatorUpdate,
  details: operator.operatorDetails,
  offSuccess: operator.offSuccess,
};
/* const mapDispatchToProps = (dispatch) => {
  return {
    details: (operatorId, operators) => dispatch(operator.operatorDetails(operatorId, operators)),
  };
}; */

export default connect(mapStateToProps, actionCreators)(withTranslation()(OperatorRoles));
