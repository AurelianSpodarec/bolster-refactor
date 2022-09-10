import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import BugReport from 'pages/dashboard/companyAdmin/bugReport/BugReport';

const BugReportRoutes = ({ base = '/company/bug-report' }) => (
    <SwitchWith404>
        <Route exact path={base} component={BugReport} />
    </SwitchWith404>
);

export default BugReportRoutes;
