import React from 'react';
import { Grid } from '@material-ui/core';

import { C_TYPOGRAPHY } from '../../../components';
import { Montserrat } from '../../../theme/fontFamily';

export const InfoCell = ({ title, value }) => {
  return (
    <Grid item xs={12} sm={6}>
      <C_TYPOGRAPHY
        variant={'body1'}
        display='inline'
        fontFamily={Montserrat.SemiBold}
        color={'#909090'}
        fontSize={14}
      >
        {title}:
      </C_TYPOGRAPHY>
      <C_TYPOGRAPHY style={{ paddingLeft: 5 }} display='inline' fontFamily={Montserrat.Bold}>
        {value}
      </C_TYPOGRAPHY>
    </Grid>
  );
};
