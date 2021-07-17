import React from 'react';
import { Grid } from '@material-ui/core';
import { ScreenTitle } from '../../components';

const HomeClientScreen = () => {
  return (
    <Grid container justify='center'>
      {/* <Typography></Typography> */}
      <ScreenTitle title='Inicio' create={false} />
    </Grid>
  );
};

export default HomeClientScreen;
