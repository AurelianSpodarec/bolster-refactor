import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import SinglePinContainer from 'components/pins/singlePin/containers/SinglePinContainer';

const PinRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}/:id`} component={SinglePinContainer} />
    </SwitchWith404>
);

export default PinRoutes;
