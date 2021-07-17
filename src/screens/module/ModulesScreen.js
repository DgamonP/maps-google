import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import { C_BUTTON, C_TABLE, C_TEXTFIELD, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { useHistory } from 'react-router';

const ModuleScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { t } = props;

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    return [createColumn(t('modules.name'), 'name')];
  }

  function rows() {
    return [
      {
        name: 'Modulo 1',
        moduleId: 1,
      },
      {
        moduleId: 2,
        name: 'Modulo 2',
      },
    ];
  }

  return (
    <>
      <div className={classes.mainHome}>

        <Paper className={classes.mainRoot}>
          <Grid container>
            <Grid item xs={12}>
              <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
                {t('modules.title')}
              </C_TYPOGRAPHY>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10 }}>
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
          <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
            <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Grid item xs={12} sm={3} md={3}>
                <C_TEXTFIELD
                  border={false}
                  search={true}
                  placeholder='Buscar ...'
                />
              </Grid>
            </Grid>
            <C_TABLE
              columns={columns()}
              rows={rows()}
              onRow={(value) => {
                history.push('module/' + value.moduleId);
              }}
            ></C_TABLE>
          </Paper>
        </Paper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { operations } = state.operation;
  return {};
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(withTranslation()(ModuleScreen));
