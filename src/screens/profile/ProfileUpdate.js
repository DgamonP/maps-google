
import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { Grid, Paper } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';

import { profile } from '../../state/actions';
import { StyleContext } from '../../theme/BaseStyles';
import ProfileUpdateForm from './components/ProfileUpdateForm';

import { C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

const ProfileUpdate = (props) => {

  const { t, update } = props;
  const classes = React.useContext(StyleContext);
  const history = useHistory();

  function onBack() {
    history.goBack();
  }

  const onSubmit = (data) => {
    console.log(data);
    // update(data)
  };

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>

          <Grid item xs={12}>
            <KeyboardBackspace 
              fontSize='large' 
              onClick={onBack} 
              style={{ cursor: 'pointer', color: '#070707' }}
            />
          </Grid>

          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
                { 'Edita perfil'}
            </C_TYPOGRAPHY>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 2, }}>
            <C_TYPOGRAPHY fontFamily={Montserrat.ExtraLight} fontSize={12}>
                { 'Configuración' } &gt; { 'Editar perfil' }
            </C_TYPOGRAPHY>
          </Grid>

          <ProfileUpdateForm onSubmit={onSubmit} t={t} onBack={onBack} />
          
        </Grid>
      </Paper>
    </div>
  );

};

const mapStateToProps = () => {
  return {};
};

const actionCreators = {
  update: profile.profileUpdate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(ProfileUpdate));
