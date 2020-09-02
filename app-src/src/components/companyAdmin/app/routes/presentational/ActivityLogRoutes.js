import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ActivityLogContainer from 'components/companyAdmin/activityLog/containers/ActivityLogContainer';
import EditActivityLogContainer from 'components/companyAdmin/activityLog/containers/EditActivityLogContainer';

const SettingsRoutes = ({ base = '/company/activity-log' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ActivityLogContainer} />
        <Route exact path={`${base}/edit-settings`} component={EditActivityLogContainer} />
    </SwitchWith404>
);

export default SettingsRoutes;
