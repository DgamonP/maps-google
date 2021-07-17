
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Popover } from '@material-ui/core';

const C_POPOVER = ( props ) => {

    const { id, onClose, visible } = props;

    const open = Boolean(visible);

    return (
        <>
            <Popover
                id={id}
                open={open}
                onClose={onClose}
                anchorEl={visible}
                anchorOrigin={ {
                    vertical: 'bottom',
                    horizontal: 'center',
                } }
                transformOrigin={ {
                    vertical: 'top',
                    horizontal: 'center',
                } }
            >
                <Grid style={{ padding: 5, }}>
                    { props.children }
                </Grid>
            </Popover>
        </>
    );

};

C_POPOVER.propTypes = {
    onClose: PropTypes.func.isRequired,

    id:      PropTypes.string,
    visible: PropTypes.any,
}

C_POPOVER.defaultProps = {
    onClose: undefined,
};

export {C_POPOVER};

