import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllSights from 'components/sites/allSites/presentational/AllSites';

const SitesRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={baseUrl} component={AllSights} />
    </SwitchWith404>
);

export default SitesRoutes;
