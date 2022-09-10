import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import CompaniesContainer from 'pages/dashboard/client/companies/containers/CompaniesContainer';

const CompaniesRoutes = ({ base = '/client/companies' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={CompaniesContainer} />
    </SwitchWith404>
);

export default CompaniesRoutes;
