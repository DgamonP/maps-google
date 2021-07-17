

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export const AuthRoute = () => {
    return (
        <>
            <Switch>
                <Route exact path={ '/login' } render={ ( props ) => <LoginScreen { ...props } /> } />
                <Route exact path={ '/register' } render={ ( props ) => <RegisterScreen { ...props } /> } />
                <Redirect to={ '/login' } />
            </Switch>
        </>
    );
};



