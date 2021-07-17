
import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { Grid, Paper } from '@material-ui/core';

import { StyleContext } from "../../theme/BaseStyles";
import { C_BUTTON, C_TABLE, C_TEXTFIELD, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';

const OpportunitiesScreen = (props) => {

    const classes = React.useContext(StyleContext);

    const { t, history } = props;

    function createColumn( title, id ) {
        return { id, title };
    }
    
    function columns() {
        return [
            createColumn( t( 'opportunities.date' ), 'date' ),
            createColumn( t( 'opportunities.code' ), 'code' ),
            createColumn( t( 'opportunities.state' ), 'state' ),
            createColumn( t( 'opportunities.client' ), 'client' ),
            createColumn( t( 'opportunities.category' ), 'category' ),
            createColumn( t( 'opportunities.service' ), 'service' ),
            createColumn( t( 'opportunities.origin' ), 'origin' ),
            createColumn( t( 'opportunities.destination' ), 'destination' ),
            createColumn( t( 'opportunities.postulant' ), 'postulant' ),
            createColumn( 'Opciones', 'option' ),
        ];
    }

    function rows() {
        return [
            {
                date: '20/04/2021',
                code: 'OPODX202100117',
                state: 'Publicada',
                client: 'Alicorp',
                category: 'Alimentos',
                service: 'FTL',
                origin: 'Warnes',
                destination: 'Cochabamba',
                postulant: '0',
            },
            {
                date: '20/04/2021',
                code: 'OPODX202100117',
                state: 'Publicada',
                client: 'Monopol',
                category: 'Pinturas',
                service: 'FTL',
                origin: 'Santa Cruz',
                destination: 'La Paz',
                postulant: '0',
            },
        ];
    }

    return (
        <>
            <div className={classes.mainHome}>
                <Paper className={classes.mainRoot}>
                    <Grid container>
                        <Grid item xs={12}>
                            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
                                { t( 'opportunities.title' ) }
                            </C_TYPOGRAPHY>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 10, }}>
                            <C_BUTTON
                                fullWidth={false}
                                variant={'text'}
                                style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4, }}
                            >
                                + { t( 'opportunities.create' ) }
                            </C_BUTTON>
                        </Grid>
                    </Grid>
                    <Paper className={classes.paper_table} style={{ marginTop: 15, }}>
                        <Grid container style={{display: 'flex', justifyContent: 'space-between', }}>
                            <Grid item xs={12} sm={3} md={3}>
                                <C_TEXTFIELD 
                                    border={false}
                                    prefix={
                                        <img src="/assets/iconData/icon_search.png" width="18px" height="18px" alt="none" />
                                    }
                                    placeholder="Buscar ..."
                                />
                            </Grid>
                            <Grid container item xs={12} sm={9} md={6} justify="flex-end" alignItems="flex-end" style={{ position: 'relative', top: -5, }}>
                                <C_BUTTON 
                                    fullWidth={false} 
                                    style={{ borderRadius: 8, marginRight: 6, padding: 3, paddingLeft: 6, paddingRight: 6, }}
                                    variant="outlined"
                                >
                                    { t( 'opportunities.client' ) }
                                </C_BUTTON>
                                <C_BUTTON 
                                    fullWidth={false} 
                                    style={{ borderRadius: 8, marginRight: 6, padding: 3, paddingLeft: 6, paddingRight: 6, }}
                                    variant="outlined"
                                >
                                    { t( 'opportunities.category' ) }
                                </C_BUTTON>
                                <C_BUTTON 
                                    fullWidth={false} 
                                    style={{ borderRadius: 8, padding: 3, paddingLeft: 6, paddingRight: 6, }}
                                    variant="outlined"
                                >
                                    { t( 'opportunities.service' ) }
                                </C_BUTTON>
                            </Grid>
                        </Grid>
                        <C_TABLE 
                            columns={columns()}
                            rows={rows()}
                            onRow={
                                (value) => {
                                    history.push('opportunities/'+ value.code);
                                }
                            }
                        >
                            
                        </C_TABLE>
                    </Paper>
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
    connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OpportunitiesScreen))
);
