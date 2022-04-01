import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UpcomingAlerts from '../presentational/UpcomingAlerts';
import { alertsError, alertsIsFetching, selectAlerts } from 'selectors/companyAdmin/alerts';
import { fetchAllAlerts } from 'actions/companyAdmin/alerts/async/fetchAllAlerts';

const UpcomingAlertsContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllAlerts());
    }, []);

    const alerts = useSelector(selectAlerts);
    const isFetching = useSelector(alertsIsFetching);
    const error = useSelector(alertsError);

    return (
        <div className="upcoming-alerts-container">
            <UpcomingAlerts alerts={alerts} isFetching={isFetching} error={error} />
        </div>
    );
};

export default UpcomingAlertsContainer;
