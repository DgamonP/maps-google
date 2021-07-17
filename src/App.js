import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

import AppRouter from './routers/AppRouter';
import { I18nextProvider } from 'react-i18next';

import i18n from './locate/i18n';
import store from './state/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { createTheme } from './theme';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const theme = createTheme({
  direction: 'ltr',
  responsiveFontSizes: true,
  roundedCorners: true,
  theme: 'LIGTH',
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
          <Provider store={store}>
            <AppRouter theme={theme} />
          </Provider>
          </MuiPickersUtilsProvider>
        </I18nextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
