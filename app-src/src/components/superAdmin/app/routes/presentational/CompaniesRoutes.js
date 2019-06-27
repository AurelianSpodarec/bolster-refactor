import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCompaniesContainer from 'components/superAdmin/companies/allCompanies/containers/AllCompaniesContainer';
import SingleCompanyContainer from 'components/superAdmin/companies/singleCompany/containers/SingleCompanyContainer';
import TemplateBuilderContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/TemplateBuilderContainer';
import LabelExamplePageContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/LabelExamplePageContainer';
import PreviewSectionListContainer from 'components/superAdmin/templateBuilder/templatePreview/containers/PreviewSectionListContainer';

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
        <Route
            exact
            path={`${base}/:companyID/template/:uuid/form-example`}
            component={PreviewSectionListContainer}
        />
    </SwitchWith404>
);

export default CompaniesRoutes;
