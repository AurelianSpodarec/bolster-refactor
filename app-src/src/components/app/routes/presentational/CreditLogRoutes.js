import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllCreditLogs from 'components/creditLogs//allCreditLogs/presentational/AllCreditLogs';

const CreditLogsRoutes = () => (
    <Switch>
        <Route exact path="/creditlogs" component={AllCreditLogs} />
    </Switch>
);

export default CreditLogsRoutes;
