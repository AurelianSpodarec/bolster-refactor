import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import CompanyReportsQueueContainer from 'pages/dashboard/companyAdmin/companyReports/shared/containers/CompanyReportsQueueContainer';

const ReportsRoutes = ({ base = '/company/reports' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={CompanyReportsQueueContainer} />
    </SwitchWith404>
);

export default ReportsRoutes;
