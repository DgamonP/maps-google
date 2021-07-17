import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { Avatar, Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import { C_INFOCELLS, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

const LoadOrderDetailsTransportUnit = (props) => {
  const { t, transportUnit } = props;

  const { user, plate } = transportUnit || {};
  const { auth, profile, address } = user || {};

  // console.log(props)

  let name = 'S/N';
  if (profile && profile.firstName) {
    name = profile.firstName;
    if (profile.lastName) {
      name = name + ' ' + profile.lastName;
    }
  }

  return (
    <Grid container direction='column' style={{ marginTop: 10 }}>
      <Grid item xs={12} style={{ marginTop: 15, marginBottom: 15 }}>
        <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={16}>
          {t('loadOrder.details.detailsDrive')}
        </C_TYPOGRAPHY>
      </Grid>

      <Grid container direction={'row'} style={{ marginBottom: 10 }}>
        <Grid>
          <Avatar
            alt='profile'
            src='https://th.bing.com/th/id/OIP.M7w1ss471C7rqWMewL1FgwHaHa?pid=ImgDet&rs=1'
            style={{ width: 70, height: 70, borderRadius: 15 }}
          />
        </Grid>
        <Grid style={{ paddingLeft: 10 }}>
          <C_TYPOGRAPHY
            variant={'body1'}
            fontFamily={Montserrat.Regular}
            color={'#000000'}
            fontSize={13}
            style={{ marginTop: 5 }}
          >
            {name}
          </C_TYPOGRAPHY>
          <C_TYPOGRAPHY
            variant={'body1'}
            fontFamily={Montserrat.Light}
            color={'#000000'}
            fontSize={10}
          >
            <StarIcon style={{ fontSize: 14, position: 'relative', top: 3, color: '#EC8105' }} />{' '}
            {'4,7'}
          </C_TYPOGRAPHY>
        </Grid>
      </Grid>

      <Grid container direction={'row'} style={{ marginBottom: 10 }}>
        <C_INFOCELLS title={'Placa'} value={plate && plate} />
        <C_INFOCELLS title={'Nro Celular'} value={auth && auth.phone && auth.phone} />
        <C_INFOCELLS title={'Ciudad'} value={address && address.city && address.city} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { transportUnit } = state.transportUnit;
  return { transportUnit };
};

export default connect(mapStateToProps, {})(withTranslation()(LoadOrderDetailsTransportUnit));
