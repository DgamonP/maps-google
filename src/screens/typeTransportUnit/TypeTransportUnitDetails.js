import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { Montserrat } from '../../theme/fontFamily';
import { StyleContext } from '../../theme/BaseStyles';
import { C_BUTTON, C_TABLE, C_TYPOGRAPHY, FormTitle } from '../../components';
import { typeTransportUnit } from '../../state/actions';
import { TypeTransportUnitFeatureItem } from './components/TypeTransportUnitFeatureItem';

const TypeTransportUnitDetails = (props) => {
  const history = useHistory();
  const { typeTransportUnitId } = useParams();
  const classes = useContext(StyleContext);
  const { typeTransportUnit, typeTransportUnits, details } = props;
  const { _id, description, features } = typeTransportUnit || {};

  useEffect(() => {
    details(typeTransportUnitId, typeTransportUnits);
  }, [typeTransportUnitId, typeTransportUnits, details]);

  function onBack() {
    history.goBack();
  }

  const columns = () => [
    { title: 'Nombre', id: 'name' },
    { title: 'Valor', id: 'value' },
  ];

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <FormTitle
          onBack={onBack}
          title={'Detalle de tipo de unidad de transporte'}
          subtitle={{
            inicio: 'Tipo de unidad de transporte',
            accion: 'Detalle de tipo de unidad de transporte',
          }}
        />

        <Grid item xs={12} sm={6}>
          <C_TYPOGRAPHY
            variant={'body1'}
            display='inline'
            fontFamily={Montserrat.SemiBold}
            color={'#909090'}
            fontSize={14}
          >
            Nombre:
          </C_TYPOGRAPHY>
          <C_TYPOGRAPHY style={{ paddingLeft: 5 }} display='inline' fontFamily={Montserrat.Bold}>
            {description}
          </C_TYPOGRAPHY>
        </Grid>

        <Grid container direction='row' style={{ marginTop: 15 }}>
          <C_BUTTON
            fullWidth={false}
            variant='outlined'
            style={{ marginRight: 8 }}
            onClick={() => history.push(`/typeTransportUnit/${_id}/update`)}
          >
            Editar
          </C_BUTTON>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
          <C_TABLE columns={columns()}>
            {features &&
              features.map((item) => <TypeTransportUnitFeatureItem key={item._id} {...item} />)}
          </C_TABLE>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { typeTransportUnit, typeTransportUnits } = state.typeTransportUnit;
  return { typeTransportUnit, typeTransportUnits };
};

const actionCreators = {
  details: typeTransportUnit.typeTransportUnitDetails,
};

export default connect(
  mapStateToProps,
  actionCreators
)(withTranslation()(TypeTransportUnitDetails));
