import React from 'react';
import PropTypes from 'prop-types';

import { Breadcrumbs, Grid } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';

import { C_TYPOGRAPHY } from '../typography';
import { Montserrat } from '../../theme/fontFamily';

const FormTitle = (props) => {
  const { onBack, subtitle, title } = props;

  function onComponentSubTitle() {
    let data = [];
    for (let value in subtitle) {
      data.push(
        <C_TYPOGRAPHY key={value} fontFamily={Montserrat.ExtraLight} fontSize={12}>
          {subtitle[value]}
        </C_TYPOGRAPHY>
      );
    }
    return data;
  }

  return (
    <>
      {onBack && (
        <Grid item xs={12}>
          <KeyboardBackspace
            fontSize='large'
            onClick={onBack}
            style={{ cursor: 'pointer', color: '#070707' }}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
          {title}
        </C_TYPOGRAPHY>
      </Grid>

      <Grid item xs={12} style={{ marginTop: 1 }}>
        <Breadcrumbs
          aria-label='breadcrumb'
          separator={<span style={{ marginLeft: -6, marginRight: -6 }}> {'>'} </span>}
        >
          {onComponentSubTitle()}
        </Breadcrumbs>
      </Grid>
    </>
  );
};

FormTitle.propTypes = {
  onBack: PropTypes.func,

  title: PropTypes.node,
  subtitle: PropTypes.object,
};

FormTitle.defaultProps = {
  title: '',
  subtitle: {},
};

export { FormTitle };
