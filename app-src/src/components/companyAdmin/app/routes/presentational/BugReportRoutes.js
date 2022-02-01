import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import BugReport from 'components/companyAdmin/bugReport/BugReport';

const BugReportRoutes = ({ base = '/company/bug-report' }) => (
    <SwitchWith404>
        <Route exact path={base} component={BugReport} />
    </SwitchWith404>
);

export default BugReportRoutes;
