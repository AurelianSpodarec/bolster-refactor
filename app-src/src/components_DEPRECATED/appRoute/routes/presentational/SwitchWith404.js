import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

const SwitchWith404 = ({ children }) => (
    <Switch>
        {children}
        <Redirect to="/404" />
    </Switch>
);

export default SwitchWith404;
