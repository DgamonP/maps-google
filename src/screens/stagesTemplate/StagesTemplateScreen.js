import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { stagesTemplate } from '../../state/actions';
import { C_BUTTON, C_LOADING, C_TABLE, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import StagesTemplateItem from './components/StagesTemplateItem';

const StagesTemplateScreen = (props) => {
  const history = useHistory();
  const { stagesTemplates, loadingAction, list } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    return [
      createColumn('Tipo de despacho', 'dispatchType'),
      createColumn('Tipo de servicio', 'typeService'),
      createColumn('Ruta', 'place'),
    ];
  }

  return (
    <>
      <C_LOADING open={loadingAction} />
      <Grid container item xs={12} style={{ marginTop: 10 }}>
        <C_TYPOGRAPHY variant='h4' fontFamily={Montserrat.Bold} fontSize={20}>
          Plantilla de etapas
        </C_TYPOGRAPHY>
      </Grid>
      <Grid container item xs={12} style={{ marginTop: 10 }}>
        <C_BUTTON
          fullWidth={false}
          fontSize={10}
          variant={'text'}
          style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
          fontFamily={Montserrat.Bold}
          onClick={() => history.push('stagesTemplate/create')}
        >
          + Crear plantilla de etapas
        </C_BUTTON>
      </Grid>

      <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
        <C_TABLE columns={columns()}>
          {stagesTemplates &&
            stagesTemplates.map((item, index) => <StagesTemplateItem key={index} {...item} />)}
        </C_TABLE>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const { stagesTemplates, loadingAction } = state.stagesTemplate;
  return { stagesTemplates, loadingAction };
};

const actionCreators = {
  list: stagesTemplate.stagesTemplatesList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(StagesTemplateScreen));
