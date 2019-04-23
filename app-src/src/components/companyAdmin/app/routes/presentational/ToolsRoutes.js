import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import PinOptions from 'components/companyAdmin/pins/pinOptions/presentational/PinOptions';
import Support from 'components/companyAdmin/support/support/presentational/Support';
import GenerationQueueContainer from 'components/companyAdmin/generationQueue/shared/containers/GenerationQueueContainer';
import AllCreditLogsContainer from 'components/companyAdmin/creditLogs/allCreditLogs/containers/AllCreditLogsContainer';
import CreateOperativeAlert from 'components/companyAdmin/operativeAlerts/createOperativeAlert/presentational/CreateOperativeAlert';
import AllOperativeAlertsContainer from 'components/companyAdmin/operativeAlerts/allOperativeAlerts/containers/AllOperativeAlertsContainer';
import TemplatesContainer from 'components/companyAdmin/templates/allTemplates/containers/TemplatesContainer';
import SingleTemplateContainer from 'components/companyAdmin/templates/singleTemplate/containers/SingleTemplateContainer';
import TransferRequests from 'components/companyAdmin/transferRequests/presentational/TransferRequests';
import AllReports from 'components/companyAdmin/reports/allReports/components/presentational/AllReports';

const ToolsRoutes = ({ base = '/company/tools' }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${base}/credit-logs`}
            component={AllCreditLogsContainer}
        />
        <Route exact path={`${base}/create-report`} component={AllReports} />
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
        <Route
            exact
            path={`${base}/templates`}
            component={TemplatesContainer}
        />
        <Route
            path={`${base}/templates/:id`}
            component={SingleTemplateContainer}
        />
        <Route
            exact
            path={`${base}/operative-alerts/create`}
            component={CreateOperativeAlert}
        />
        <Route
            exact
            path={`${base}/transfer-requests`}
            component={TransferRequests}
        />
    </SwitchWith404>
);

export default ToolsRoutes;
