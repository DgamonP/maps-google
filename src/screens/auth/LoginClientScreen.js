import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { auth } from '../../state/actions';
import { C_BUTTON, C_TYPOGRAPHY } from '../../components';
import LoginForm from './components/LoginForm';
import { Montserrat } from '../../theme/fontFamily';

const LoginClientScreen = (props) => {
  const classes = useStyles();
  const { t, login, cleanError } = props;
  const history = useHistory();

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

  useEffect(() => {
    return () => {
      if (history.action === 'POP') {
        cleanError();
      }
    };
  }, [history, cleanError]);

  return (
    <Box className={classes.body}>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.boxCentered}>
          <img
            src='assets/LogoDeltaXBlanco.png'
            alt='backgroud'
            width={'200px'}
            height={'50px'}
            style={{ position: 'relative', top: 24 }}
          />
        </Grid>
        <Grid item xs={12} className={classes.boxCentered}>
          <Paper elevation={10} className={classes.paper}>
            <Grid item xs={12} style={{ padding: '0 9px' }}>
              <C_TYPOGRAPHY variant={'h1'} fontSize={24} fontFamily={Montserrat.Bold}>
                {t('auth.login.title')}
              </C_TYPOGRAPHY>
            </Grid>
            <Box className={classes.boxCentered}>
              <LoginForm onSubmit={onSubmit} t={t} />
            </Box>
            <Box className={classes.boxCentered}>
              <C_BUTTON
                fullWidth={false}
                variant={'text'}
                style={{ padding: 5, marginTop: 5 }}
                onClick={() => history.replace('/login')}
              >
                {'Entrar como operador'}
              </C_BUTTON>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = () => {
  return {};
};

const actionCreators = {
  login: auth.login,
  cleanError: auth.cleanError,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(LoginClientScreen));

const useStyles = makeStyles((theme) => ({
  inputStandar: {
    marginTop: '25px',
    opacity: 1,
    height: '46px',
  },

  boxCentered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 8px',
  },

  gridCentered: {
    textAlign: 'center',
    width: '50%',
  },

  textButtonStandar: {
    textAlign: 'center',
    font: 'normal normal bold 14px/18px Montserrat',
    letterWpacing: '-0.64px',
    color: '#FFFFFF',
    opacity: 1,
    textTransform: 'none',
  },

  groupStandar: {
    width: '90%',
  },

  buttonStandard: {
    textAlign: 'center',
    background: '#EC8105 0% 0% no-repeat padding-box',
    borderRadius: '11px',
    opacity: 1,
    height: '46px',
    width: '90%',
  },

  body: {
    width: '100%',
    maxWidth: '1024px',
    minWidth: '100%',
    height: '100%',
    minHeight: '100%',
    margin: 'auto',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // background:
    //   "transparent url('assets/semi-truck-trailer-warehouse-freight-industry-logistics-transport.png') 100% 100% no-repeat padding-box",
    backgroundImage:
      "url('assets/semi-truck-trailer-warehouse-freight-industry-logistics-transport.png')",
    backgroundColor: '#FFFFFF',
    backgroundSize: '100% 100%',
  },

  boxHeader: {
    textAlign: 'left',
    font: 'normal normal 600 25px/29px Montserrat',
    letterSpacing: '-1.02px',
    color: '#000000',
    opacity: 1,
  },

  root: {
    width: '90%',
    backgroundColor: 'transparent',
  },
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(2),
    width: 270,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  margin: {
    margin: theme.spacing(0.5),
  },
}));
