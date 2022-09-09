import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import CompanyReportsQueueContainer from 'pages/dashboard/client/companyReports/shared/containers/CompanyReportsQueueContainer';
import CreateReportContainer from 'pages/dashboard/client/reports/createReport/components/containers/CreateReportContainer';

const ReportsRoutes = ({ base = '/client/reports' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={CompanyReportsQueueContainer} />
        <Route exact path={`${base}/create`} component={CreateReportContainer} />
    </SwitchWith404>
);

export default ReportsRoutes;
