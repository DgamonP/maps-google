import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Paper, InputLabel, TextField, Button } from '@material-ui/core';

import { auth } from '../../state/actions';
import { useForm } from '../../hooks/useForm';

const RegisterScreen = (props) => {
  const classes = useStyles();
  const { t, register } = props;

  const [formValues, handleInputChange] = useForm({
    email: 'user1@gmail.com',
    name: 'User',
    password: '123456',
    password2: '123456',
  });

  const { email, name, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    register(email, name, password);
  };

  return (
    <Grid container className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <Grid align='center'>
          <h2>{t('auth.register.title')}</h2>
        </Grid>
        <form onSubmit={handleRegister}>
          <Box m={2} mx={3}>
            <Container>
              <InputLabel>{t('auth.register.email')}</InputLabel>
              <TextField
                variant='outlined'
                name='email'
                value={email}
                onChange={handleInputChange}
                required
              />
            </Container>
            <br />
            <Container>
              <InputLabel htmlFor='component-filled'>{t('auth.register.password')}</InputLabel>
              <TextField
                variant='outlined'
                type='password'
                name='password'
                autocomplete='on'
                value={password}
                onChange={handleInputChange}
                required
              />
            </Container>
            <br />
            <Container>
              <InputLabel htmlFor='component-filled'>
                {t('auth.register.repeatPassword')}
              </InputLabel>
              <TextField
                variant='outlined'
                type='password'
                name='password2'
                autocomplete='on'
                value={password2}
                onChange={handleInputChange}
                required
              />
            </Container>
          </Box>
          <Box m={2}>
            <Box className={classes.buttons}>
              <Button
                type='submit'
                variant='outlined'
                size='medium'
                color='primary'
                className={classes.margin}
              >
                {t('auth.register.create')}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const mapStateToProps = () => {
  return {};
};

const actionCreators = {
  register: auth.register,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(RegisterScreen));
