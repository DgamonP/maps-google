import React, { useState, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



const DropdownInput = ({ setSearchTermText, locations, searchTermText }) => {

    const [stateText, setStateText] = React.useState('');

    const [locationsClean, setLocationsClean] = React.useState( parseAddress(locations));


    function parseAddress(rawLocations){

        const addresses =  rawLocations.map(location => {
            return {
                formatted_address: location.formatted_address,
            }
        })
        
        console.log("addresses from dropdown", addresses)
        return addresses
    }

    // Control initial render for search do not triger
    const initial = React.useRef(true);

    React.useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }

        const timer = setTimeout(() => {
            setSearchTermText(stateText);
        }, 500)

        return () => clearTimeout(timer)

    }, [setSearchTermText, stateText])



    return (
        <Fragment>
            <Autocomplete
                id="combo-box-demo"
                options={locationsClean}
                onInputChange={
                    (event, value, reason) => {
                        if (reason === 'input') {
                            setStateText(value)
                            setLocationsClean( parseAddress(locations) )
                        }
                        if (reason === 'reset' ) {
                            //setSelection()
                            console.log("Selected...", value)
                            setSearchTermText(value)
                            // setLocationsClean( parseAddress(locations) )
                        }
                        if ( reason === 'clear') {
                            console.log("Selected...", value)
                            setLocationsClean( parseAddress(locations) )

                        }
                    }
                }
                getOptionLabel={(option) => !option.formatted_address?stateText:option.formatted_address}
                getOptionSelected={(option) => option.formatted_address?
                    option.formatted_address: searchTermText}

                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={searchTermText} variant="outlined" />}
            />
        </Fragment>
    );
}


export default DropdownInput;