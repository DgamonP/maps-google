import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { typeTransportUnit } from '../../state/actions';
import { C_BUTTON, C_LOADING, C_TABLE, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import TypeTransportUnitItem from './components/TypeTransportUnitItem';

const TypeTransportUnitScreen = (props) => {
  const history = useHistory();
  const { typeTransportUnits, loadingAction, list } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    return [createColumn('Descripción', 'description'), createColumn('action', 'Acción')];
  }

  return (
    <>
      <C_LOADING open={loadingAction} />
      <Grid container item xs={12} style={{ marginTop: 10 }}>
        <C_TYPOGRAPHY variant='h4' fontFamily={Montserrat.Bold} fontSize={20}>
          Tipos de unidad de transporte
        </C_TYPOGRAPHY>
      </Grid>
      <Grid container item xs={12} style={{ marginTop: 10 }}>
        <C_BUTTON
          fullWidth={false}
          fontSize={10}
          variant={'text'}
          style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
          fontFamily={Montserrat.Bold}
          onClick={() => history.push(`typeTransportUnit/create`)}
        >
          + Crear tipo de unidad de transporte
        </C_BUTTON>
      </Grid>

      <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
        <C_TABLE columns={columns()}>
          {typeTransportUnits &&
            typeTransportUnits.map((item) => <TypeTransportUnitItem key={item._id} {...item} />)}
        </C_TABLE>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const { typeTransportUnits, loadingAction } = state.typeTransportUnit;
  return { typeTransportUnits, loadingAction };
};

const actionCreators = {
  list: typeTransportUnit.typeTransportUnitsList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(TypeTransportUnitScreen));
