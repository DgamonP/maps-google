import { Grid, IconButton, Paper } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { C_BUTTON, C_TYPOGRAPHY } from '../../../components';
import { Montserrat } from '../../../theme/fontFamily';

const StagesTemplateTasksList = (props) => {
  const {
    stagesTemplate: { stagesTemplate },
    onConfirmationData,
    goToAddTask,
  } = props;

  return (
    <Grid container direction='row' spacing={2}>
      {stagesTemplate.map((item) => (
        <Grid key={item._id} item xs={12} sm={3}>
          <Paper
            elevation={2}
            style={{
              borderRadius: 4,
              paddingTop: 6,
              marginTop: 10,
              height: 300,
              display: 'flex',
            }}
          >
            <Grid container justify='space-between' spacing={2} style={{ flex: 1 }}>
              <Grid container justify='center' item xs={12}>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'
                  style={{ background: '#FAAC58', height: 36, width: '100%' }}
                >
                  <C_TYPOGRAPHY fontFamily={Montserrat.Bold}>{item.name}</C_TYPOGRAPHY>
                </Grid>
              </Grid>
              {item.tasks.map((item2) => (
                <Grid key={item2._id} container justify='center' alignItems='center'>
                  <Grid container alignItems='center' justify='center' style={{ width: '95%' }}>
                    <C_TYPOGRAPHY fontSize={13} style={{ textAlign: 'center' }}>
                      {item2.name}
                    </C_TYPOGRAPHY>
                    {onConfirmationData !== null && (
                      <IconButton
                        size='small'
                        title='Eliminar tarea'
                        onClick={() => {
                          onConfirmationData(item._id, item2._id);
                        }}
                      >
                        <Delete size='small' />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
              <Grid container justify='center' alignItems='flex-end' item xs={12}>
                <C_BUTTON
                  fullWidth={false}
                  variant='outlined'
                  onClick={() => {
                    goToAddTask(item._id);
                  }}
                >
                  {item.tasks.length === 0 ? 'Agregar tarea' : 'Agregar y editar tarea'}
                </C_BUTTON>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StagesTemplateTasksList;
