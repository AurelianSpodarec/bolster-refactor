import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import ActivityLog from 'pages/dashboard/superAdmin/activityLog/ActivityLog';

const ActivityLogsRoutes = ({ base = '/admin/activity-logs' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ActivityLog} />
    </SwitchWith404>
);

export default ActivityLogsRoutes;
