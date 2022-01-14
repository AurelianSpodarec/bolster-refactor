import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import MessageCentre from 'components/companyAdmin/messages/messageCentre/MessageCentre';
import OperativeAlertMetricsContainer from 'components/companyAdmin/operativeAlerts/operativeAlertMetrics/containers/OperativeAlertMetricsContainer';

const MessagesRoutes = ({ base = '/company/message-centre' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={MessageCentre} />
        <Route
            exact
            path={`${base}/operative-alerts/:id/metrics`}
            component={OperativeAlertMetricsContainer}
        />
    </SwitchWith404>
);

export default MessagesRoutes;
