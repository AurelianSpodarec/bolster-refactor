import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import PinOptions from 'components/companyAdmin/pins/pinOptions/presentational/PinOptions';
import Support from 'components/companyAdmin/support/support/presentational/Support';
import GenerationQueueContainer from 'components/companyAdmin/generationQueue/shared/containers/GenerationQueueContainer';
import AllCreditLogsContainer from 'components/companyAdmin/creditLogs/allCreditLogs/containers/AllCreditLogsContainer';
import AllOperativeAlertsContainer from 'components/companyAdmin/operativeAlerts/allOperativeAlerts/containers/AllOperativeAlertsContainer';

const ToolsRoutes = ({ base = '/company/tools' }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${base}/credit-logs`}
            component={AllCreditLogsContainer}
        />
        <Route exact path={`${base}/pin-options`} component={PinOptions} />
        <Route exact path={`${base}/support`} component={Support} />
        <Route
            exact
            path={`${base}/generation-queue`}
            component={GenerationQueueContainer}
        />
        <Route
            exact
            path={`${base}/operative-alerts`}
            component={AllOperativeAlertsContainer}
        />
    </SwitchWith404>
);

export default ToolsRoutes;
