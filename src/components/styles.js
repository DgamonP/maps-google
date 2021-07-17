import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    // marginLeft: theme.spacing(2),
    minWidth: 160,
    textColor: 'white',
    color: 'white',
  },
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    color: 'white',
  },
  icon: { color: 'white' },
  label: { color: 'white' },
  media: {
    height: 140,
  },
}));
