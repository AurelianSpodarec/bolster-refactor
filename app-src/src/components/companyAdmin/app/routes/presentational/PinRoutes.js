import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SinglePinContainer from 'components/companyAdmin/pins/singlePin/containers/SinglePinContainer';
import AddPinHistoryContainer from 'components/companyAdmin/pins/addPinHistory/containers/AddPinHistoryContainer';

const PinRoutes = ({ base = '/company/pins' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SinglePinContainer} />
        <Route
            exact
            path={`${base}/:id/add-history`}
            component={AddPinHistoryContainer}
        />
    </SwitchWith404>
);

export default PinRoutes;
