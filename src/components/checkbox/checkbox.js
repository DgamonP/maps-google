
import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox, createMuiTheme, FormControlLabel, ThemeProvider } from '@material-ui/core';
import { orange, brown } from '@material-ui/core/colors';

const themes = createMuiTheme({
    palette: {
        primary:  orange,
        secondary: brown,
    },
});

const C_CHECKBOX = ( props ) => {

    const { checked, label, name, onChange, primary, style } = props;

    return (
        <>
            <ThemeProvider theme={themes}>
                <FormControlLabel 
                    control={
                        <Checkbox
                            checked={checked}
                            color={primary}
                            onChange={onChange}
                            name={name}
                        />
                    }
                    label={label}
                    style={style}
                />
            </ThemeProvider>
        </>
    );

};

C_CHECKBOX.propTypes = {
    color:   PropTypes.string,
    name:    PropTypes.string,

    label: PropTypes.node,
    style: PropTypes.object,
    
    checked: PropTypes.bool,

    onChange: PropTypes.func,
};

C_CHECKBOX.defaultProps = {
    color:  "primary",
    checked: false,
    style:   {},
};

export {
    C_CHECKBOX
};
