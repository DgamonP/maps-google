
import React from 'react';
import PropTypes from 'prop-types';

import { Collapse, Fade, Snackbar } from '@material-ui/core';
// import { AlertTitle } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert  elevation={6} variant="filled" {...props} />;
}

const C_SNACKBAR = ( props ) => {

    // const [transition] = React.useState( () => TransitionDown );
    const { message, onClose, open, severity } = props;

    function onComponent() {
        return (
            // <Collapse in={open}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={onClose}
                    style={{ borderRadius: 5, }}
                    TransitionComponent={Fade}
                >
                    <Alert onClose={onClose} severity={severity} 
                        style={{ borderRadius: 5, }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            // {/* </Collapse> */}
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );

};

C_SNACKBAR.propTypes = {
    open:     PropTypes.bool,
    onClose:  PropTypes.func,
    severity: PropTypes.string,
    message:  PropTypes.node,
};

C_SNACKBAR.defaultProps = {
    open:     false,
    onClose:  undefined,
    severity: "success",  // "warning", "error", "info", "success"
};

export {
    C_SNACKBAR
};
