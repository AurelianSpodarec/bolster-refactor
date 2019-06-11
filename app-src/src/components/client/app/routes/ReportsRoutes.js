import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import CompanyReportsQueueContainer from 'components/client/companyReports/shared/containers/CompanyReportsQueueContainer';

const ReportsRoutes = ({ base = '/client/reports' }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${base}`}
            component={CompanyReportsQueueContainer}
        />
    </SwitchWith404>
);

export default ReportsRoutes;
