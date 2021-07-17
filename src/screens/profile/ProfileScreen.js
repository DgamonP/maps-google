import React from 'react';
import { CardMedia, Grid, Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment-timezone';

import { profile } from '../../state/actions';
import { StyleContext } from '../../theme/BaseStyles';
import { C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

const pathPhoto =
  'https://th.bing.com/th/id/Rb155c61e749a9dfc95ebc367bb29acf3?rik=El4k%2bk%2f%2baUVGmw&pid=ImgRaw';

const ProfileScreen = (props) => {
  const { t, user, profileById, profile } = props;
  // console.log('profile ==> ', profile);
  const classes = React.useContext(StyleContext);

  // useEffect(() => {
  //   profileById(user.username);
  // }, [profileById, user.username]);

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot} elevation={0}>
        <Grid container direction={'column'}>
          <Grid item xs={12}>
            <C_TYPOGRAPHY
              variant={'h4'}
              fontFamily={Montserrat.Bold}
              fontSize={24}
              style={{ marginTop: 10 }}
            >
              {t('profile.title')}
            </C_TYPOGRAPHY>
          </Grid>

          <Grid container direction='row'></Grid>

          <Grid container direction='row'>
            <Grid item sm={7} xs={12}>
              <Grid container direction='column'>
                <Grid item container style={{ margin: 4 }}>
                  <C_TYPOGRAPHY
                    fontFamily={Montserrat.Bold}
                    fontSize={16}
                    style={{ marginRight: 4 }}
                  >
                    {t('profile.firstName')}:
                  </C_TYPOGRAPHY>
                  <Typography>{profile.firstName}</Typography>
                </Grid>
                <Grid item container style={{ margin: 4 }}>
                  <C_TYPOGRAPHY
                    fontFamily={Montserrat.Bold}
                    fontSize={16}
                    style={{ marginRight: 4 }}
                  >
                    {t('profile.lastName')}:
                  </C_TYPOGRAPHY>
                  <Typography>{profile.lastName}</Typography>
                </Grid>
                <Grid item container style={{ margin: 4 }}>
                  <C_TYPOGRAPHY
                    fontFamily={Montserrat.Bold}
                    fontSize={16}
                    style={{ marginRight: 4 }}
                  >
                    {t('profile.documentId')}:
                  </C_TYPOGRAPHY>
                  <Typography>{profile.documentId}</Typography>
                </Grid>
                {/* <Grid item container style={{ margin: 4 }}>
                  <C_TYPOGRAPHY
                    fontFamily={Montserrat.Bold}
                    fontSize={16}
                    style={{ marginRight: 4 }}
                  >
                    {t('profile.taxId')}:
                  </C_TYPOGRAPHY>
                  <Typography>{profile2.taxId}</Typography>
                </Grid> */}
                {/* <Grid item container style={{ margin: 4 }}>
                  <C_TYPOGRAPHY
                    fontFamily={Montserrat.Bold}
                    fontSize={16}
                    style={{ marginRight: 4 }}
                  >
                    {t('profile.company')}:
                  </C_TYPOGRAPHY>
                  <Typography>{profile2.companyId}</Typography>
                </Grid> */}
                <Grid item container style={{ margin: 4 }}>
                  <C_TYPOGRAPHY
                    fontFamily={Montserrat.Bold}
                    fontSize={16}
                    style={{ marginRight: 4 }}
                  >
                    {t('profile.birthDate')}:
                  </C_TYPOGRAPHY>
                  <Typography>
                    {moment.tz(profile.birthDate, profile.timeZone).format('DD/MM/YYYY')}
                  </Typography>
                </Grid>
                <Grid item container style={{ margin: 4 }}>
                  <C_TYPOGRAPHY
                    fontFamily={Montserrat.Bold}
                    fontSize={16}
                    style={{ marginRight: 4 }}
                  >
                    {t('profile.timeZone')}:
                  </C_TYPOGRAPHY>
                  <Typography>{profile.timeZone}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={5} xs={12}>
              {/* <img width='240' height='240' loading="lazy" src={profile2.pathPhoto} alt='imgProfile' /> */}
              <CardMedia
                style={{ width: 240, height: 240 }}
                image={pathPhoto}
                // image={profile2.pathPhoto}
                // title='Foto de perfil'
              />
            </Grid>
          </Grid>

          {/* <Link to='/profileUpdate' style={{ margin: 4, textDecoration: 'none' }}>
            <Button type='button' variant='contained' color='primary'>
              {t('profile.edit')}
            </Button>
          </Link> */}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user, profile: profile } = state.auth;
  // const { profile } = state.profile;
  return { user, profile };
};

const actionCreators = {
  profileById: profile.profileById,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(ProfileScreen));
