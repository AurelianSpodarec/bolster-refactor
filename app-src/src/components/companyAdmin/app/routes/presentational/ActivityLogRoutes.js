import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ActivityLogContainer from 'components/companyAdmin/settings/activityLog/containers/ActivityLogContainer';

const SettingsRoutes = ({ base = '/company/activity-log' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ActivityLogContainer} />
    </SwitchWith404>
);

export default SettingsRoutes;
