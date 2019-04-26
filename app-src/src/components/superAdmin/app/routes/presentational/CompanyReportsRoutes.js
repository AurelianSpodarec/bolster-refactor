import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import CompanyReportsContainer from 'components/companyAdmin/companyReports/shared/containers/CompanyReportsQueueContainer';

const CompanyReportsRoutes = ({ base = '/admin/company-reports' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={CompanyReportsContainer} />
    </SwitchWith404>
);

export default CompanyReportsRoutes;
