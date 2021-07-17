
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

export const ColorContext = React.createContext();

export const colorStyles = makeStyles( (theme) => ( {
    primaryColor: {
        background: "#EC8105 0% 0% no-repeat padding-box",
        color: "white",
    },
} ) );
