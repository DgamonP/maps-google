
import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { Grid } from '@material-ui/core';

import { C_INFOCELLS, C_TYPOGRAPHY } from '../../components';
import { Montserrat } from '../../theme/fontFamily';


const OpportunitiesDetailsInfo = ( props ) => {

    const { t } = props;

    return (
        <>
            <Grid item style={{ marginTop: 10, display: 'flex' }}>
                <Grid item xs={12} sm={6} style={{ paddingRight: 5, }}>
                    <Grid item xs={12} style={{ marginTop: 10, }}>
                        <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
                            { t( 'opportunities.details.subtitle' ) }
                        </C_TYPOGRAPHY>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 15, display: 'flex', }}>
                        <C_INFOCELLS 
                            title={ t( 'opportunities.details.client' ) } 
                            value={ 'Alicorp' } 
                        />
                        <C_INFOCELLS 
                            title={ t( 'opportunities.details.category' ) } 
                            value={ 'Alimentos' } 
                        />
                        <C_INFOCELLS 
                            title={ t( 'opportunities.details.service' ) } 
                            value={ 'FTL' } 
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 15, display: 'flex', }}>
                        <C_INFOCELLS 
                            title={ t( 'opportunities.details.origin' ) } 
                            value={ 'Warnes' } 
                        />
                        <C_INFOCELLS 
                            title={ t( 'opportunities.details.destination' ) } 
                            value={ 'Cochabamba' } 
                        />
                        <C_INFOCELLS 
                            title={ t( 'opportunities.details.date' ) } 
                            value={ 'Martes 20, Abril' } 
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingLeft: 5, }}>
                    <Grid item xs={12} style={{ marginTop: 10, }}>
                        <C_TYPOGRAPHY fontFamily={Montserrat.Bold} fontSize={14}>
                            { t( 'opportunities.details.subtitleloads' ) }
                        </C_TYPOGRAPHY>
                    </Grid>
                    
                    <Grid item xs={12} style={{ marginTop: 15, display: 'flex', }}>
                        <C_INFOCELLS 
                            title={ 'VOLUMEN' } 
                            value={ '-' } 
                        />
                        <C_INFOCELLS 
                            title={ 'PESO' } 
                            value={ '4.5 Tn' } 
                        />
                        <C_INFOCELLS 
                            title={ 'VALOR FLETE' } 
                            value={ 'Bs. 2600' } 
                        />
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 15, display: 'flex', }}>
                        <C_INFOCELLS 
                            title={ 'TIPO TRANSPORTE' } 
                            value={ 'Nissan Condor' } 
                        />
                        <C_INFOCELLS 
                            title={ 'CANTIDAD' } 
                            value={ '2 camiones' } 
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid container style={{ marginTop: 10, }}>
                <Grid item xs={12} sm={12}>
                    <C_INFOCELLS 
                        title={ 'Nota' } 
                        value={ 'Soya en sacos para cargar en planta FINO, Warnes. Precio Bs. 2600. Anticipo del 80% al momento de cargar y asignación de carga de retorno Cochabamba - Santa Cruz.' } 
                        xs={12}
                        sm={12}
                    />
                </Grid>
            </Grid>
        </>
    );

};

const mapStateToProps = ( state ) => ( {

} );

const mapDispatchToProps = ( dispatch ) => ( {

} );

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OpportunitiesDetailsInfo));
