import React from 'react';
import { useSelector } from 'react-redux';

import UpcomingAlerts from '../presentational/UpcomingAlerts';
import { alertsIsFetching, selectAlerts } from 'selectors/alerts';

const UpcomingAlertsContainer = () => {
    const alerts = useSelector(selectAlerts);
    console.log(alerts);
    const isFetching = useSelector(alertsIsFetching);

    return (
        <div className="upcoming-alerts-container">
            <UpcomingAlerts alerts={alerts} isFetching={isFetching} />
        </div>
    );
};

export default UpcomingAlertsContainer;
