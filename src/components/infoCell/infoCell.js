
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import { C_TYPOGRAPHY } from '../typography';
import { Montserrat } from '../../theme/fontFamily';

const C_INFOCELLS = ( props ) => {

    const { title, value, sm, xs } = props;

    function onComponent() {
        return (
            <Grid container item direction='column' xs={xs} sm={sm}>
                <C_TYPOGRAPHY 
                    variant={'body1'} 
                    fontFamily={Montserrat.ExtraLight} 
                    color={'#909090'} 
                    fontSize={11}
                >
                    {title}
                </C_TYPOGRAPHY>
                <C_TYPOGRAPHY 
                    variant={'body1'} 
                    fontFamily={Montserrat.Regular} 
                    color={'#000000'} 
                    fontSize={12}
                    style={{ marginTop: 5, }}
                >
                    {value}
                </C_TYPOGRAPHY>
            </Grid>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );

};

C_INFOCELLS.propTypes = {
    title: PropTypes.node,
    value: PropTypes.node,

    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
};

C_INFOCELLS.defaultProps = {
    title: undefined,
    value: undefined,

    xs: 12,
    sm: 4,
};

export {
    C_INFOCELLS
};
