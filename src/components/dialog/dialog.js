
import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { FormAction } from '../formAction';
import { Montserrat } from '../../theme/fontFamily';

const C_DIALOG = ( props ) => {

    const { cancelText, contentText, onCancel, onClose, okText, okType, onOK, open, title, width } = props;

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    { title }
                </DialogTitle>
                <DialogContent style={{ width: width, padding: "1px 24px", marginBottom: -10, }}>
                    <DialogContentText id="alert-dialog-description" style={{ fontFamily: Montserrat.SemiBold, color: "#000000", fontSize: 15, }}>
                        { contentText }
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ padding: "0px 24px", paddingBottom: 18, }}>
                    <form onSubmit={props.onSubmit}>
                        <FormAction 
                            onCancel={onCancel} 
                            okText={okText}
                            cancelText={cancelText}
                            okType={okType}
                            onOk={onOK}
                        />
                    </form>
                </DialogActions>
            </Dialog>
        </>
    );

};

C_DIALOG.propTypes = {
    open: PropTypes.bool,

    okText:     PropTypes.string,
    cancelText: PropTypes.string,
    okType:     PropTypes.string,

    width: PropTypes.any,

    title:       PropTypes.node,
    contentText: PropTypes.node,

    onClose:  PropTypes.func,
    onCancel: PropTypes.func,
    onOK:     PropTypes.func,
    
    onSubmit: PropTypes.any,
};

C_DIALOG.defaultProps = {
    open:  false,
    title: "",
    okType: "submit",
};

export {
    C_DIALOG
};