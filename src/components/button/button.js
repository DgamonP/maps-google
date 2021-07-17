import React from 'react';
import PropTypes from 'prop-types';

import { Button, CircularProgress } from '@material-ui/core';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { purple, orange, red, brown } from '@material-ui/core/colors';
import { Montserrat } from '../../theme/fontFamily';

let variants = 'contained';
let colors = 'contained';

const ColorButtons = withStyles((theme) => ({
  root: {
    fontFamily: Montserrat.SemiBold,
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 2,
    textTransform: 'none',
    color:
      variants === 'text' || variants === 'outlined'
        ? 'none'
        : theme.palette.getContrastText(purple[500]),
    backgroundColor:
      variants === 'text' || variants === 'outlined' || colors == 'secondary'
        ? 'none'
        : orange[500],
    fontSize: theme.typography.fontSize - 1,
    // boxShadow: '0 2px 5px 1px rgba(255, 105, 135, .3)',
    padding: variants === 'text' ? 0 : 'none',
    '&:hover': {
      backgroundColor:
        variants === 'text' || variants === 'outlined'
          ? 'transparent'
          : colors == 'secondary'
          ? 'none'
          : orange[700],
      color:
        variants === 'text' || variants === 'outlined'
          ? colors == 'secondary'
            ? 'none'
            : orange[500]
          : 'none',
    },
  },
}))(Button);

const themes = createMuiTheme({
  palette: {
    primary: orange,
    secondary: brown,
  },
});

const C_BUTTON = (props) => {
  const {
    size,
    variant,
    type,
    children,
    color,
    disabled,
    onClick,
    fullWidth,
    endIcon,
    startIcon,
    style,
    progress,
    id,
  } = props;

  variants = variant;
  colors = color;

  function onComponent() {
    let styles = {};
    styles = Object.assign(styles, style);

    return (
      <ThemeProvider theme={themes}>
        <ColorButtons
          size={size}
          variant={variant}
          type={type}
          color={color}
          disabled={disabled}
          onClick={onClick}
          fullWidth={fullWidth}
          endIcon={endIcon}
          startIcon={startIcon}
          style={styles}
          id={id}
          {...props}
        >
          {progress ? (
            <CircularProgress
              size={25}
              style={{ color: 'orange', marginTop: 2, marginBottom: 2 }}
            />
          ) : (
            children
          )}
        </ColorButtons>
      </ThemeProvider>
    );
  }

  return <>{onComponent()}</>;
};

C_BUTTON.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,

  className: PropTypes.any,
  color: PropTypes.any,
  id: PropTypes.any,

  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  progress: PropTypes.bool,

  onClick: PropTypes.func,

  endIcon: PropTypes.node,
  startIcon: PropTypes.node,

  style: PropTypes.object,
};

C_BUTTON.defaultProps = {
  size: 'medium', //"small" | "medium" | "large",
  variant: 'contained', //"text" | "outlined" | "contained",
  type: 'button', //"button" | "submit" | "reset",

  className: '',
  color: 'primary',

  disabled: false,
  fullWidth: true,

  style: {},
};

// React.memo( C_BUTTON );

export { C_BUTTON };
