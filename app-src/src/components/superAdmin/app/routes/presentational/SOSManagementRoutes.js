import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SOSManagementContainer from 'components/superAdmin/sosManagement/sosManagement/containers/SOSManagementContainer';

const SOSManagementRoutes = ({ base = '/admin/sos-management' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={SOSManagementContainer} />
    </SwitchWith404>
);

export default SOSManagementRoutes;
