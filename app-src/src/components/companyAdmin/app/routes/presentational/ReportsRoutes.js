import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllReports from 'components/companyAdmin/reports/allReports/components/AllReports';

const ReportsRoutes = ({ base = '/company/reports' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllReports} />
    </SwitchWith404>
);

export default ReportsRoutes;
