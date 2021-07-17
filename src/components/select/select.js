
import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MenuItem, TextField } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';

import './css/select.css';

const C_SELECT = ( props ) => {

    const { dataSource, disabled, error, helperText, label, fullWidth, onChange, required, size, style, value, variant } = props;

    function onComponent() {

        let styles = { margin: 0, borderRadius: 6, };
        styles = Object.assign(styles, style );

        const themes = createMuiTheme({
            palette: {
                primary:  orange,
                secondary: red,
            },
        });
    
        return (
            <ThemeProvider theme={themes}>
                <TextField
                    select
                    label={label}
                    value={value}
                    onChange={onChange}
                    variant={variant}
                    fullWidth={fullWidth}
                    required={required}
                    size={size}
                    disabled={disabled}
                    error={error}
                    style={styles}
                    helperText={helperText}
                    SelectProps={ {
                        draggable: true,
                    } }
                    {...props}
                >
                    {/* { dataSource.map( (option, key) => (
                        <MenuItem key={key} value={option.value}
                            style={{ borderRadius: 2, }}
                        >
                            {option.label}
                        </MenuItem>
                    ) ) } */}

                    { props.children }

                </TextField>
            </ThemeProvider>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );

};

C_SELECT.propTypes = {
    label:        PropTypes.node,
    helperText:   PropTypes.node,

    value:        PropTypes.any,
    
    variant:      PropTypes.string,
    size:         PropTypes.string,

    fullWidth:    PropTypes.bool,
    required:     PropTypes.bool,
    disabled:     PropTypes.bool,
    error:        PropTypes.bool,

    onChange:     PropTypes.func,
    dataSource:   PropTypes.array,

    style: PropTypes.object,
}

C_SELECT.defaultProps = {
    variant:       "outlined",
    label:         "",
    size:          "small",
    value:         undefined,

    fullWidth:     true,
    required:      false,
    disabled:      false,
    error:         false,

    dataSource:    [],

    style: {},
};

export {
    C_SELECT
};

