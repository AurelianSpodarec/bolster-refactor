import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import Floor from 'components/floors/floor/presentational/Floor';

const FloorRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={Floor} />
    </SwitchWith404>
);

export default FloorRoutes;
