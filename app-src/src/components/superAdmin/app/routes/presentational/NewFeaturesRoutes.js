import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import NewFeaturesContainer from 'components/superAdmin/newFeatures/containers/NewFeaturesContainer';

const UsersRoutes = ({ base = '/admin/new-features' }) => (
    <SwitchWith404>
        <Route exact path={base} component={NewFeaturesContainer} />
    </SwitchWith404>
);

export default UsersRoutes;
