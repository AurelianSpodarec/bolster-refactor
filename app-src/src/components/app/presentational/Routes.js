import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withShowLayout from 'components/app/hocs/withShowLayout';
import Dashboard from 'components/dashboard/presentational/Dashboard';
import AllSights from 'components/sites/allSites/presentational/AllSites';
import LoginContainer from 'components/auth/login/containers/LoginContainer';
import AllCreditLogs from 'components/creditLogs//allCreditLogs/presentational/AllCreditLogs';

const Routes = ({ showLoggedInLayout }) => (
    <div
        id="page-area"
        className={`size-lg-${showLoggedInLayout ? '8' : '12'}`}
    >
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/sites" component={AllSights} />
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/creditlogs" component={AllCreditLogs} />
        </Switch>
    </div>
);

export default withShowLayout(Routes);
