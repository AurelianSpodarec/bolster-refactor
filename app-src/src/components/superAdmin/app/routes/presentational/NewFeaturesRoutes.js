import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import NewFeaturesContainer from 'components/superAdmin/newFeatures/containers/NewFeaturesContainer';
import featureSingleContainer from 'components/superAdmin/newFeatures/containers/FeatureSingleContainer';

const UsersRoutes = ({ base = '/admin/new-features' }) => (
    <SwitchWith404>
        <Route exact path={base} component={NewFeaturesContainer} />
        <Route path={`${base}/:id`} component={featureSingleContainer} />
    </SwitchWith404>
);

export default UsersRoutes;
