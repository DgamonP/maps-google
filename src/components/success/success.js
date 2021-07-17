
import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogActions, DialogContent, DialogContentText, Grid } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Montserrat } from '../../theme/fontFamily';
import { C_BUTTON } from '../button';

const C_SUCCESS = ( props ) => {

    const { contentText, onClose, onOk, open } = props;

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-describedby="alert-success-description"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogContent style={{ width: 350, padding: "1px 24px", paddingTop: 20, marginBottom: -10, }}>
                    <Grid container direction={'row'} >
                        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "green" }}>
                            <CheckCircleIcon style={{ fontSize: 28, }} />
                        </Grid>
                        <Grid item xs={10}>
                            <DialogContentText id="alert-dialog-description" style={{ fontFamily: Montserrat.Medium, color: "#000000", fontSize: 15, }}>
                                { contentText }
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ padding: "0px 24px", paddingBottom: 15, }}>
                    <Grid container direction={'row'} justify={ "center" } style={{ marginTop: 10, }}>
                        <C_BUTTON
                            fullWidth={false}
                            onClick={onOk}
                        >
                            Continuar
                        </C_BUTTON>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );

};

C_SUCCESS.propTypes = {
    open: PropTypes.bool,

    contentText: PropTypes.node,

    onClose:  PropTypes.func,
    onOk:     PropTypes.func,
};

C_SUCCESS.defaultProps = {
    open:  false,
};

export {
    C_SUCCESS
};