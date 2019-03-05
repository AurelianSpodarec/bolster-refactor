import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import Drawing from 'components/drawings/singleDrawing/presentational/SingleDrawing';

const DrawingsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={Drawing} />
    </SwitchWith404>
);

export default DrawingsRoutes;
