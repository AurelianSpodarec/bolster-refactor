import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import HeadquartersCompaniesContainer from 'components/companyAdmin/headquarters/containers/HeadquartersCompaniesContainer';
import AddHeadquartersCompany from 'components/companyAdmin/headquarters/addHeadquartersCompany/presentational/AddHeadquartersCompany';

const HeadquartersRoutes = ({ base = '/company/headquarters' }) => (
    <SwitchWith404>
        <Route exact path={base} component={HeadquartersCompaniesContainer} />
        <Route
            exact
            path={`${base}/companies`}
            component={HeadquartersCompaniesContainer}
        />
        <Route
            exact
            path={`${base}/companies/create`}
            component={AddHeadquartersCompany}
        />
    </SwitchWith404>
);

export default HeadquartersRoutes;
