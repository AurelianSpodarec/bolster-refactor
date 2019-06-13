import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllMessagesContainer from 'components/companyAdmin/messages/allMessages/containers/AllMessagesContainer';
import OperativeAlertMetricsContainer from 'components/companyAdmin/operativeAlerts/operativeAlertMetrics/containers/OperativeAlertMetricsContainer';
import CreateOperativeAlert from 'components/companyAdmin/operativeAlerts/createOperativeAlert/presentational/CreateOperativeAlert';

const MessagesRoutes = ({ base = '/company/message-centre' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllMessagesContainer} />
        <Route
            exact
            path={`${base}/operative-alerts/:id/metrics`}
            component={OperativeAlertMetricsContainer}
        />
        <Route
            exact
            path={`${base}/operative-alerts/create`}
            component={CreateOperativeAlert}
        />
    </SwitchWith404>
);

export default MessagesRoutes;
