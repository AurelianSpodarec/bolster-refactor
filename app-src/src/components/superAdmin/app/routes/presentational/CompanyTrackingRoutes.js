import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import CompanyTracking from 'components/superAdmin/companyTracking/CompanyTracking';

const CompanyTrackingRoutes = ({ base = '/admin/company-tracking' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={CompanyTracking} />
    </SwitchWith404>
);

export default CompanyTrackingRoutes;
