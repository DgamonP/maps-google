import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Dialog, IconButton, CardMedia, CardActionArea, Card } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import { notification, stage, task } from '../state/actions';
import { useParams } from 'react-router';
import { C_BUTTON } from './button';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Montserrat } from '../theme/fontFamily';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    // maxHeight: 800,
  },
  media: {
    height: 350,
    width: 400,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6' style={{ fontFamily: Montserrat.Bold, color: 'black' }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Dialogs = (props) => {
  const classes = useStyles();
  const { loadOrderId } = useParams();
  const { show, showButton, task, showNotification, taskApprove } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    showNotification(false, null);
  };

  const handleAproved = () => {
    showNotification(false, null);
    const { _id, idStages, action } = task;
    taskApprove(_id, idStages, action, loadOrderId);
  };

  function openImage() {
    setIsOpen(true);
  }

  function onComponentImage() {
    if (
      task &&
      Array.isArray(task.file) &&
      task.file.length > 0 &&
      task.file[0].largePath &&
      isOpen
    ) {
      return <Lightbox mainSrc={task.file[0].largePath} onCloseRequest={() => setIsOpen(false)} />;
    }
    return null;
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={show}
      disableEscapeKeyDown
    >
      {onComponentImage()}
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {task && task.name}
      </DialogTitle>
      <DialogContent dividers style={{ paddingTop: 5, paddingBottom: 4 }}>
        <Typography gutterBottom>
          {/* Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. */}
        </Typography>
        <Card className={classes.root}>
          <CardActionArea>
            {task && (
              <CardMedia
                className={classes.media}
                image={task.file[0].largePath}
                title='Contemplative'
                onClick={openImage}
              />
            )}
          </CardActionArea>
        </Card>
        {/* <CardMedia
          className={classes.media}
          image={'https://cdo-curriculum.s3.amazonaws.com/media/uploads/img_tag.png'}
          title='Contemplative Reptile'
        /> */}
      </DialogContent>
      <DialogActions>
        {task && showButton && (
          <>
            {/* <C_BUTTON
              fullWidth={false}
              variant='outlined'
              color={'secondary'}
              onClick={() => {}}
              style={{ marginLeft: 4 }}
            >
              {'Rechazar'}
            </C_BUTTON> */}
            <C_BUTTON fullWidth={false} variant='outlined' onClick={handleAproved}>
              {'Aprobar'}
            </C_BUTTON>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  const { show, showButton } = state.notification;
  const { task } = state.stage;
  return { show, showButton, task };
};

const actionCreators = {
  showNotification: notification.showNotification,
  taskApprove: stage.stageTaskApprove,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(Dialogs));
