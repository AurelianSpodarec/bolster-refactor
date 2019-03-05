import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllCreditLogs from 'components/creditLogs//allCreditLogs/presentational/AllCreditLogs';

const CreditLogsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={baseUrl} component={AllCreditLogs} />
    </SwitchWith404>
);

export default CreditLogsRoutes;
