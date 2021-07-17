import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { C_TYPOGRAPHY } from '../../components';
import Dialogs from '../../components/Dialogs';
import { Montserrat } from '../../theme/fontFamily';
import TaskItem from './components/TaskItem';
import { useStyles } from './styles';

const LoadOrderTasks = (props) => {
  const classes = useStyles();
  const { travel } = props;
  const { stages } = travel || {};

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10, color: 'black' }}>
        <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={16}>
          {'Historial de tareas'}
        </C_TYPOGRAPHY>
      </Grid>

      <Dialogs />

      {stages &&
        stages.map((item) => (
          <Grid key={item._id}>
            <Typography className={classes.textBold}>{item.name}</Typography>
            {item.tasks.map((item2) => (
              <TaskItem key={item2._id} stageId={item._id} {...item2} />
            ))}
          </Grid>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  const { travel } = state.loadOrder;
  return { travel };
};

export default connect(mapStateToProps, null)(withTranslation()(LoadOrderTasks));
