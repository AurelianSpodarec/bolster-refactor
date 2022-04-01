import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import UpcomingAlertsContainer from 'components/companyAdmin/upcomingAlerts/containers/UpcomingAlertsContainer';

const UpcomingAlertsRoutes = ({ base = '/company/upcoming-alerts' }) => (
    <SwitchWith404>
        <Route exact path={base} component={UpcomingAlertsContainer} />
    </SwitchWith404>
);

export default UpcomingAlertsRoutes;
