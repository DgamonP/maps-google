import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import { C_TABLE, C_TEXTFIELD, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { task } from '../../state/actions';
import TaskItem from './TaskItem';
import TaskCreateForm from './components/TaskCreateForm';

const TaskScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const { t, history, list, create, tasks } = props;

  useEffect(() => {
    list();
  }, [list]);

  const onSubmit = (data) => {
    console.log(data);
    create(data);
  };

  function createColumn(title, id) {
    return { id, title };
  }
  function columns() {
    return [
      createColumn('Id', '_id'),
      createColumn(t('task.name'), 'name'),
      createColumn(t('action'), 'action'),
    ];
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container style={{ marginBottom: 10 }}>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              {t('task.title')}
            </C_TYPOGRAPHY>
          </Grid>
        </Grid>
        <Grid container direction={'column'}>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={20}>
              {'Crear tarea'}
            </C_TYPOGRAPHY>
          </Grid>
          <TaskCreateForm onSubmit={onSubmit} t={t} />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              {t('task.title')}
            </C_TYPOGRAPHY>
          </Grid>
        </Grid>
        <Paper elevation={1} className={classes.paper_table} style={{ marginTop: 5 }}>
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
          <C_TABLE
            columns={columns()}
            onRow={(value) => {
              history.push('task/edit/' + value.id);
            }}
            variant={'text'}
            style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
            fontFamily={Montserrat.SemiBold}
            textTransform={false}
          >
            {tasks && tasks.map((item) => <TaskItem key={item._id} {...item} />)}
          </C_TABLE>
        </Paper>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { tasks } = state.task;
  return { tasks };
};

const actionCreators = {
  list: task.tasksList,
  create: task.taskRegister,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(TaskScreen));
