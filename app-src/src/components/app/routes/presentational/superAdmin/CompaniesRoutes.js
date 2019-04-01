import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllCompaniesContainer from 'components/superAdmin/companies/allCompanies/containers/AllCompaniesContainer';
import SingleCompanyContainer from 'components/superAdmin/companies/singleCompany/containers/SingleCompanyContainer';

const CompaniesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllCompaniesContainer} />
        <Route
            exact
            path={`${baseUrl}/:id`}
            component={SingleCompanyContainer}
        />
    </SwitchWith404>
);

export default CompaniesRoutes;
