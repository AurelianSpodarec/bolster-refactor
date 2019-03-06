import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import Building from 'components/buildings/building/presentational/Building';

const BuildingRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={Building} />
    </SwitchWith404>
);

export default BuildingRoutes;
