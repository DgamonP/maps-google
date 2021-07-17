import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { Montserrat } from '../../theme/fontFamily';
import { StyleContext } from '../../theme/BaseStyles';
import { C_BUTTON, C_TABLE, C_TYPOGRAPHY, FormTitle } from '../../components';
import { stagesTemplate } from '../../state/actions';
import { StagesTemplateTaskItem } from './components/StagesTemplateTaskItem';

const StagesTemplateDetails = (props) => {
  const history = useHistory();
  const classes = useContext(StyleContext);
  const { dispatchTypeId, typeServiceId, placeId } = useParams();
  const { loading, stagesTemplate, details } = props;
  const { stagesTemplate: stagesList, dispatchType, typeServices, place } = stagesTemplate || {};

  useEffect(() => {
    details(dispatchTypeId, typeServiceId, placeId);
  }, [dispatchTypeId, typeServiceId, placeId, details]);

  function onBack() {
    history.goBack();
  }

  const InfoContainer = (title, value) => (
    <Grid item xs={12}>
      <C_TYPOGRAPHY
        variant={'body1'}
        display='inline'
        fontFamily={Montserrat.SemiBold}
        color={'#909090'}
      >
        {title}:
      </C_TYPOGRAPHY>
      <C_TYPOGRAPHY style={{ paddingLeft: 5 }} display='inline' fontFamily={Montserrat.Bold}>
        {value}
      </C_TYPOGRAPHY>
    </Grid>
  );

  const columns = () => [
    { title: 'Nombre', id: 'name' },
    { title: 'Cambia etapa', id: 'changeStage' },
    { title: 'Ve el chofer', id: 'viewCarrier' },
    { title: 'Ve el cliente', id: 'viewClient' },
    { title: 'Permite archivo', id: 'allowFiles' },
    { title: 'Envia notification', id: 'pushNotification' },
    { title: 'Valida operador', id: 'operator' },
    { title: 'Valida chofer', id: 'carrier' },
    { title: 'Valida cliente', id: 'client' },
  ];

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <FormTitle
          onBack={onBack}
          title={'Detalle de plantilla de etapas'}
          subtitle={{
            inicio: 'Plantilla de etapas',
            accion: 'Detalle de plantilla de etapas',
          }}
        />
        {/* <C_LOADING open={stagesTemplate !== null && loading} /> */}
        {!loading && dispatchType && InfoContainer('Tipo de despacho', dispatchType.name)}
        {!loading && typeServices && InfoContainer('Tipo de servicio', typeServices.name)}
        {!loading && place && InfoContainer('Lugar', place.countryName)}
        {!loading && (
          <Grid container direction='row' style={{ marginTop: 15 }}>
            <C_BUTTON
              fullWidth={false}
              variant='outlined'
              style={{ marginRight: 8 }}
              onClick={() => {
                history.push(
                  `/stagesTemplate/update/${dispatchTypeId}/${typeServiceId}/${placeId}`
                );
              }}
            >
              Editar
            </C_BUTTON>
          </Grid>
        )}
        {!loading &&
          stagesList &&
          stagesList.map((item) => (
            <Paper
              key={item._id}
              elevation={1}
              style={{ borderRadius: 4, padding: 5, marginTop: 10 }}
            >
              <Grid item xs={12}>
                <C_TYPOGRAPHY fontFamily={Montserrat.Bold}>{item.name}</C_TYPOGRAPHY>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <C_TABLE columns={columns()}>
                  {item.tasks.map((item2) => (
                    <StagesTemplateTaskItem key={item2._id} {...item2} />
                  ))}
                </C_TABLE>
              </Grid>
            </Paper>
          ))}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, stagesTemplate } = state.stagesTemplate;
  return { loading, stagesTemplate };
};

const actionCreators = {
  details: stagesTemplate.stagesTemplateDetails,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(StagesTemplateDetails));
