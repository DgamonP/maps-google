
import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { Grid, Paper } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { StyleContext } from "../../theme/BaseStyles";
import { C_BUTTON, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

import OpportunitiesDetailsInfo from './OpportunitiesDetailsInfo';

const OpportunitiesDetails = ( props ) => {

    const { match, history, t } = props;
    const { params } = match;

    const classes = React.useContext(StyleContext);

    function onBack() {
        history.goBack();
    }

    return (
        <>
            <div className={classes.mainHome}>
                <Paper className={classes.mainRoot}>
                    <Grid container>
                        <Grid item xs={12}>
                            <KeyboardBackspaceIcon 
                                fontSize='large' 
                                onClick={onBack} 
                                style={{ cursor: 'pointer', color: '#070707' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
                                { t( 'opportunities.show' ) }
                            </C_TYPOGRAPHY>
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 10, }}>
                            <C_TYPOGRAPHY fontFamily={Montserrat.ExtraLight} fontSize={13}>
                                { t( 'opportunities.title' ) } &gt; { t( 'opportunities.details.title' ) }
                            </C_TYPOGRAPHY>
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 30, }}>
                            <C_TYPOGRAPHY display='inline' fontFamily={Montserrat.ExtraLight} fontSize={15}>
                                { t( 'opportunities.code' ) }: 
                            </C_TYPOGRAPHY>
                            <C_TYPOGRAPHY style={{ paddingLeft: 5, }} fontSize={16} display='inline' fontFamily={Montserrat.SemiBold}>
                                { 'OPODX202100117' }
                            </C_TYPOGRAPHY>
                            <C_TYPOGRAPHY style={{ paddingLeft: 5, }} fontSize={16} display='inline' fontFamily={Montserrat.SemiBold}>
                                <C_BUTTON 
                                    fullWidth={false}
                                    style={{ background: '#51CB89', marginLeft: 10, }}
                                >
                                    { 'Publicada' }
                                </C_BUTTON>
                            </C_TYPOGRAPHY>
                        </Grid>

                        <Grid item xs={12}>
                            <C_TYPOGRAPHY fontFamily={Montserrat.ExtraLight} fontSize={11}>
                                { 'Publicada el 20/04/2021 por Vivian Pacheco' }
                            </C_TYPOGRAPHY>
                        </Grid>
                    </Grid>
                    
                    <OpportunitiesDetailsInfo />

                    <Grid container item xs={12} style={{ marginTop: 20, }}>
                        <C_BUTTON
                            fullWidth={false}
                            variant="outlined"
                            style={{ marginRight: 4, }}
                        >
                            {'Editar Oportunidad' }
                        </C_BUTTON>
                        <C_BUTTON
                            fullWidth={false}
                            color={'secondary'}
                            variant="outlined"
                        >
                            { 'Cerrar Oportunidad' }
                        </C_BUTTON>
                    </Grid>
                    <Grid container item xs={12} style={{ marginTop: 20, }}>
                        <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
                            { 'Postulaciones' }
                        </C_TYPOGRAPHY>
                    </Grid>
                    <Grid container item xs={12} style={{ marginTop: 20, }}>
                        <C_TYPOGRAPHY fontFamily={Montserrat.ExtraLight} fontSize={14} color={'#909090'}>
                            { '- No se han recibido postulaciones aún.' }
                        </C_TYPOGRAPHY>
                    </Grid>
                </Paper>
            </div>
        </>
    );

};

const mapStateToProps = ( state ) => ( {

} );

const mapDispatchToProps = ( dispatch ) => ( {

} );


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OpportunitiesDetails))
);

