import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import HeadquartersCompaniesContainer from 'components/companyAdmin/headquarters/containers/HeadquartersCompaniesContainer';

const HeadquartersRoutes = ({ base = '/company/headquarters' }) => (
    <SwitchWith404>
        <Route exact path={base} component={HeadquartersCompaniesContainer} />
    </SwitchWith404>
);

export default HeadquartersRoutes;
