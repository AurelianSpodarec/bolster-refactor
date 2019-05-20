import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SingleDrawingContainer from 'components/clientArea/drawings/singleDrawing/containers/SingleDrawingContainer';

const DrawingsRoutes = ({ base = '/client/drawings' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SingleDrawingContainer} />
    </SwitchWith404>
);

export default DrawingsRoutes;
