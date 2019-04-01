import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllCompaniesContainer from 'components/superAdmin/companies/allCompanies/containers/AllCompaniesContainer';
import SingleCompanyContainer from 'components/superAdmin/companies/singleCompany/containers/SingleCompanyContainer';
import TemplateBuilderContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/TemplateBuilderContainer';

const CompaniesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={AllCompaniesContainer} />
        <Route
            exact
            path={`${baseUrl}/:id`}
            component={SingleCompanyContainer}
        />
        <Route
            exact
            path={`${baseUrl}/:companyID/template/:uuid`}
            component={TemplateBuilderContainer}
        />
    </SwitchWith404>
);

export default CompaniesRoutes;
