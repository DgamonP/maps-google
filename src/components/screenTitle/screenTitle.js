
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { C_TYPOGRAPHY } from '../typography';
import { C_BUTTON } from '../button';
import { Montserrat } from '../../theme/fontFamily';

const ScreenTitle = ( props ) => {

    const { create, createText, onCreate, title } = props;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                <C_TYPOGRAPHY variant={'h4'} style={{ color: "black" }} fontFamily={Montserrat.Bold} fontSize={24}>
                    { title }
                </C_TYPOGRAPHY>
                </Grid>
                { ( create ) && 
                
                    <Grid item xs={12} style={{ marginTop: 5 }}>
                        <C_BUTTON
                            fullWidth={false}
                            onClick={ onCreate }
                            variant={'text'}
                            style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4, paddingLeft: 4 }}
                        >
                            + { createText }
                        </C_BUTTON>
                    </Grid>
                
                }
            </Grid>
        </>
    );

};

ScreenTitle.propTypes = {
    onCreate: PropTypes.func,

    create: PropTypes.bool,

    title:      PropTypes.node,
    createText: PropTypes.node,
};

ScreenTitle.defaultProps = {
    title:    "",
    createText: "",

    create: true,
};

export {
    ScreenTitle
};
