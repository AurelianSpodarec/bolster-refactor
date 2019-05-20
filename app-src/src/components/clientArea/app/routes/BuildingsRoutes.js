import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SingleBuildingContainer from 'components/companyAdmin/buildings/singleBuilding/containers/SingleBuildingContainer';

const BuildingRoutes = ({ base = '/client/buildings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleBuildingContainer} />
    </SwitchWith404>
);

export default BuildingRoutes;
