
import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { FontWeight } from '../../theme/fontWeight';

const C_TYPOGRAPHY = ( props ) => {

    const { 
        align, children, className, color, fontWeight, fontSize, component, 
        gutterBottom, noWrap, style, fontFamily, variant, bottom, top, display,
    } = props;

    function onComponent() {

        let styles = { fontFamily: fontFamily, fontWeight: fontWeight, };

        if ( color ) {
            styles = Object.assign(styles, { color: color, } );
        }

        if ( !isNaN(fontSize) ) {
            styles = Object.assign(styles, { fontSize: fontSize, } );
        }
        if ( !isNaN(bottom) ) {
            styles = Object.assign(styles, { marginBottom: bottom, } );
        }
        if ( !isNaN(top) ) {
            styles = Object.assign(styles, { marginTop: top, } );
        }
        styles = Object.assign(styles, style );

        return (
            <Typography 
                component={component} 
                variant={variant} 
                gutterBottom={gutterBottom} 
                align={align} 
                style={styles}
                className={className}
                noWrap={noWrap}
                display={display}
            >
                { children }
            </Typography>
        );
    }

    return (
        <>
            { onComponent() }
        </>
    );

};

C_TYPOGRAPHY.propTypes = {
    variant:     PropTypes.string,
    align:       PropTypes.string,
    fontWeight:  PropTypes.string,
    fontFamily:  PropTypes.string,
    color:       PropTypes.string,
    display:     PropTypes.string,

    className:   PropTypes.any,

    component:   PropTypes.string,

    noWrap:         PropTypes.bool,
    gutterBottom:   PropTypes.bool,

    size:     PropTypes.number,
    fontSize: PropTypes.number,

    bottom: PropTypes.number,
    top:    PropTypes.number,

    style: PropTypes.object,
};

C_TYPOGRAPHY.defaultProps = {
    variant:    "h6", //'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'srOnly' | 'inherit'
    align:      "inherit", //'inherit' | 'left' | 'center' | 'right' | 'justify'
    color:      undefined,
    component:  "h2",
    className:  "",
    fontFamily: "Montserrat",
    display:    "initial",  //"inline" | "initial" | "block"

    size:     undefined,
    fontSize: undefined,

    bottom: undefined,
    top:    undefined,

    fontWeight: FontWeight.SemiBold,

    noWrap:       false,
    gutterBottom: false,

    style: {},
};

// React.memo( C_TYPOGRAPHY );

export {
    C_TYPOGRAPHY
};

