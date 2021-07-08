import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ActivityLogContainer from 'components/superAdmin/activityLog/containers/ActivityLogContainer';

const ActivityLogsRoutes = ({ base = '/admin/activity-logs' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ActivityLogContainer} />
    </SwitchWith404>
);

export default ActivityLogsRoutes;
