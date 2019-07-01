import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import sosManagement from 'components/superAdmin/sosManagement/sosManagement/presentational/sosManagement';

const SOSManagementRoutes = ({ base = '/admin/sos-management' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={sosManagement} />
    </SwitchWith404>
);

export default SOSManagementRoutes;
