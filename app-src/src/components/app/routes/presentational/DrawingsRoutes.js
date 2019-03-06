import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import SingleDrawingContainer from 'components/drawings/singleDrawing/containers/SingleDrawingContainer';

const DrawingsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/:id`}
            component={SingleDrawingContainer}
        />
    </SwitchWith404>
);

export default DrawingsRoutes;
