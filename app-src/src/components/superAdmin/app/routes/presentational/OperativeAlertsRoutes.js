import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllOperativeAlertsContainer from 'components/superAdmin/operativeAlerts/containers/AllOperativeAlertsContainer';
import CreateOperativeAlertContainer from 'components/superAdmin/operativeAlerts/createOperativeAlert/containers/CreateOperativeAlertContainer';
import OperativeAlertMetricsContainer from 'components/superAdmin/operativeAlerts/operativeAlertsMetrics/containers/OperativeAlertMetricsContainer';

const OperativeAlertsRoutes = ({ base = '/admin/operative-alerts' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllOperativeAlertsContainer} />

        <Route
            exact
            path={`${base}/create`}
            component={CreateOperativeAlertContainer}
        />
        <Route
            exact
            path={`${base}/{id}/metrics`}
            component={OperativeAlertMetricsContainer}
        />
    </SwitchWith404>
);

export default OperativeAlertsRoutes;
