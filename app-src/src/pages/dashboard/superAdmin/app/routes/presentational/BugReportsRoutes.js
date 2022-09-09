import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import BugReports from 'pages/dashboard/superAdmin/bugReports/BugReports';
import BugReportSingle from 'pages/dashboard/superAdmin/bugReports/BugReportSingle';

const BugReportsRoutes = ({ base = '/admin/bug-reports' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={BugReports} />
        <Route path={`${base}/:id`} component={BugReportSingle} />
    </SwitchWith404>
);

export default BugReportsRoutes;
