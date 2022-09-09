import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCompaniesContainer from 'pages/dashboard/superAdmin/companies/allCompanies/containers/AllCompaniesContainer';
import SingleCompanyContainer from 'pages/dashboard/superAdmin/companies/singleCompany/containers/SingleCompanyContainer';
import TemplateBuilderContainer from 'pages/dashboard/superAdmin/templateBuilder/templateBuilder/containers/TemplateBuilderContainer';
import LabelExamplePageContainer from 'pages/dashboard/superAdmin/templateBuilder/templateBuilder/containers/LabelExamplePageContainer';

const CompaniesRoutes = ({ base = '/admin/companies' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllCompaniesContainer} />
        <Route exact path={`${base}/:id`} component={SingleCompanyContainer} />
        <Route
            exact
            path={`${base}/:companyID/template/:uuid`}
            component={TemplateBuilderContainer}
        />
        <Route
            exact
            path={`${base}/:companyID/template/:uuid/label-example`}
            component={LabelExamplePageContainer}
        />
    </SwitchWith404>
);

export default CompaniesRoutes;
