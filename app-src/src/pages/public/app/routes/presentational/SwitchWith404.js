import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

const SwitchWith404 = ({ children }) => (
    <Switch>
        {children}
        <Redirect to="/page-not-found" />
    </Switch>
);

export default SwitchWith404;
