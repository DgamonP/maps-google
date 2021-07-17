
import React from 'react';
import PropTypes from 'prop-types';

import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStylesBackdrop = makeStyles( ( theme ) => ( {
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
} ) );

const C_LOADING = ( props ) => {

    const className = useStylesBackdrop();
    const { open } = props;

    return (
        <>
            <Backdrop className={className.backdrop} open={open}>
                <div style={{ display: 'block' }}>
                    <CircularProgress color='inherit' />
                </div>
            </Backdrop>
        </>
    );

};

C_LOADING.propTypes = {
    open: PropTypes.bool,
};

C_LOADING.defaultProps = {
    open:  false,
};

export {
    C_LOADING
};