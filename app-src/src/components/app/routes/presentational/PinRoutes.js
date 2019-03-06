import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import SinglePin from 'components/pins/singlePin/presentational/SinglePin';

const PinRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={SinglePin} />
    </SwitchWith404>
);

export default PinRoutes;
