import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SinglePinContainer from 'components/companyAdmin/pins/singlePin/containers/SinglePinContainer';
import AddPinHistory from 'components/companyAdmin/pins/addPinHistory/presentational/AddPinHistory';
import EditPinHistory from 'components/companyAdmin/pins/editPinHistory/presentational/EditPinHistory';

const PinRoutes = ({ base = '/company/pins' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/:id`} component={SinglePinContainer} />
        <Route
            exact
            path={`${base}/:id/add-history`}
            component={AddPinHistory}
        />
        <Route
            exact
            path={`${base}/:id/edit-history/:historyID`}
            component={EditPinHistory}
        />
    </SwitchWith404>
);

export default PinRoutes;
