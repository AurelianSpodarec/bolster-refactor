import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import ActivityLog from 'pages/dashboard/companyAdmin/activityLog/presentational/ActivityLog';
import EditActivityLogContainer from 'pages/dashboard/companyAdmin/activityLog/containers/EditActivityLogContainer';

const SettingsRoutes = ({ base = '/company/activity-log' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ActivityLog} />
        <Route exact path={`${base}/edit-settings`} component={EditActivityLogContainer} />
    </SwitchWith404>
);

export default SettingsRoutes;
