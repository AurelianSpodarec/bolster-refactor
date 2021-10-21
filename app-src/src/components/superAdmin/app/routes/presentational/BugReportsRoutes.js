import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import BugReports from 'components/superAdmin/bugReports/BugReports';

const BugReportsRoutes = ({ base = '/admin/bug-reports' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={BugReports} />
    </SwitchWith404>
);

export default BugReportsRoutes;
