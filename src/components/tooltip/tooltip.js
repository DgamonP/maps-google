
import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Montserrat } from '../../theme/fontFamily';

const useStyles = makeStyles((theme) => ( {
    customTooltip: {
        maxWidth: 500,
        // margin: theme.spacing(1),
        borderRadius: 4,
        padding: '8px 12px',
        fontSize: 15,
        fontFamily: Montserrat.SemiBold,
    },
} ) );

const C_TOOLTIP = ( props ) => {

    const classes = useStyles();
    const { disableHoverListener, placement, title } = props;

    return (
        <>
            <Tooltip 
                disableHoverListener={ disableHoverListener } 
                title={ title } placement={ placement } interactive 
                TransitionComponent={Zoom} enterDelay={500} leaveDelay={200} 
                classes={{ tooltip: classes.customTooltip }}
            >
                { props.children }
            </Tooltip>
        </>
    );

};

C_TOOLTIP.propTypes = {
    disableHoverListener: PropTypes.bool,

    title: PropTypes.node,

    placement: PropTypes.string,
};

C_TOOLTIP.defaultProps = {
    disableHoverListener:  false,

    placement: "right",
};

export {
    C_TOOLTIP
};