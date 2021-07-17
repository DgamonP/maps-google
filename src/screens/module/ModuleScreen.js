import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import { C_BUTTON, C_TABLE, C_TEXTFIELD, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { moduleAction } from '../../state/actions';
import ModuleItem from './ModuleItem';

const ModuleScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  const { t, modules, list } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    return [createColumn(t('modules.name'), 'name')];
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              {t('modules.title')}
            </C_TYPOGRAPHY>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 5 }}>
            <C_BUTTON
              fullWidth={false}
              fontSize={11}
              onClick={() => {
                history.push('module/create');
              }}
              variant={'text'}
              style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
              fontFamily={Montserrat.SemiBold}
              textTransform={false}
            >
              + {t('modules.create')}
            </C_BUTTON>
          </Grid>
        </Grid>
        <Paper
          elevation={1}
          className={classes.paper_table}
          style={{ marginTop: 15 }}
          elevation={2}
        >
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Grid item xs={12} sm={3} md={3}>
              <C_TEXTFIELD border={false} search={true} placeholder='Buscar ...' />
            </Grid>
          </Grid>
          <C_TABLE columns={columns()}>
            {modules && modules.map((item) => <ModuleItem key={item._id} {...item} />)}
          </C_TABLE>
        </Paper>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { modules } = state.module;
  return { modules };
};

const actionCreators = {
  list: moduleAction.modulesList,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(ModuleScreen));
