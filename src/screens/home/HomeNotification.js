import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { withTranslation } from 'react-i18next';
import SvgColor from 'react-svg-color';

import { Card, CardHeader, Grid, GridList, GridListTile, makeStyles } from '@material-ui/core';

import { C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { notification } from '../../state/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
  },
}));

const HomeNotification = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { notifications, readNotification } = props;
  console.log(notifications);

  const goTo = (data) => {
    console.log('switch', data);
    readNotification(data.id, notifications);
    switch (data.type) {
      case 'tasks':
        history.push(`/loadOrder/show/${data.travelId}`);
        break;
      case 'postulation':
        history.push(`/loadOrder/show/${data.travelId}`);
        break;
      case 'postulationConfirmed':
        history.push(`/loadOrder/show/${data.travelId}`);
        break;
      default:
    }
  };

  if (notifications.length === 0) {
    return null;
  }
  return (
    <Grid>
      <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={20} bottom={15} top={15}>
        Notificaciones
      </C_TYPOGRAPHY>

      <div className={classes.root}>
        <GridList className={classes.gridList} spacing={8} cellHeight={76}>
          {notifications.map((item) => (
            <GridListTile key={item.data.id} style={{ width: '50%' }}>
              <Card style={{ border: '1px solid orange', position: 'relative' }}>
                <CardHeader
                  title={
                    <C_TYPOGRAPHY variant='h1' fontSize={14}>
                      {item.notification.title}
                    </C_TYPOGRAPHY>
                  }
                  subheader={
                    <C_TYPOGRAPHY
                      variant='h6'
                      color='#959696'
                      fontSize={10}
                      top={5}
                      style={{ paddingRight: 12 }}
                    >
                      {item.notification.body}
                    </C_TYPOGRAPHY>
                  }
                  avatar={
                    <div>
                      <SvgColor
                        svg={'/assets/svg/icon_activity.svg'}
                        width={24}
                        colors={['#FA8905']}
                      />
                    </div>
                  }
                  action={
                    <div
                      style={{ position: 'absolute', top: '42%', right: 7, cursor: 'pointer' }}
                      onClick={() => goTo(item.data)}
                    >
                      <SvgColor
                        svg={'/assets/svg/arrow_right.svg'}
                        width={9}
                        colors={['#FA8905']}
                      />
                    </div>
                  }
                />
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { notifications } = state.notification;
  return { notifications };
};

const actionCreators = {
  readNotification: notification.readNotification,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(HomeNotification));
