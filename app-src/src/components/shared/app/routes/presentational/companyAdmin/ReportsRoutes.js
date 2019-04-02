import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllReports from 'components/companyAdmin/reports/allReports/components/AllReports';

const ReportsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllReports} />
    </SwitchWith404>
);

export default ReportsRoutes;
