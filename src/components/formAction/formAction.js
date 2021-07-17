
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { C_BUTTON } from '../button';

const FormAction = ( props ) => {

    const { cancelDisabled, cancelText, okDisabled, okText, okType, onCancel, onOk, justify } = props;

    return (
        <>
            <Grid container direction={'row'} justify={ justify } style={{ marginTop: 15, }}>
                <C_BUTTON
                    fullWidth={false}
                    variant='outlined'
                    color={'secondary'}
                    disabled={cancelDisabled}
                    onClick={onCancel} 
                    style={{ marginRight: 10, }}
                >
                    { cancelText }
                </C_BUTTON>
                <C_BUTTON
                    fullWidth={false}
                    type={okType}
                    disabled={okDisabled}
                    onClick={onOk}
                >
                    { okText }
                </C_BUTTON>
            </Grid>
        </>
    );

};

FormAction.propTypes = {
    cancelText: PropTypes.string,
    okText:     PropTypes.string,
    okType:     PropTypes.string,
    justify:    PropTypes.string,

    onCancel:   PropTypes.func,
    onOk:       PropTypes.func,

    cancelDisabled: PropTypes.bool,
    okDisabled:     PropTypes.bool,
};

FormAction.defaultProps = {
    cancelText: "Cancelar",
    okText:     "Continuar",
    okType:     "submit",
    justify:    "flex-start", //"flex-start","center","flex-end","space-between","space-around","space-evenly"

    cancelDisabled: false,
    okDisabled:     false,
};

export {
    FormAction
};