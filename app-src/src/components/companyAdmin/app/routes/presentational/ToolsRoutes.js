import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import PinOptions from 'components/companyAdmin/pins/pinOptions/presentational/PinOptions';
import Support from 'components/companyAdmin/support/support/presentational/Support';
import CompanyReportsContainer from 'components/companyAdmin/companyReports/shared/containers/CompanyReportsQueueContainer';
import AllCreditLogsContainer from 'components/companyAdmin/creditLogs/allCreditLogs/containers/AllCreditLogsContainer';
import TemplatesContainer from 'components/companyAdmin/templates/allTemplates/containers/TemplatesContainer';
import SingleTemplateContainer from 'components/companyAdmin/templates/singleTemplate/containers/SingleTemplateContainer';
import TransferRequests from 'components/companyAdmin/transferRequests/presentational/TransferRequests';
import CreateReportContainer from 'components/companyAdmin/reports/createReport/components/containers/CreateReportContainer';

const ToolsRoutes = ({ base = '/company/tools' }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${base}/credit-logs`}
            component={AllCreditLogsContainer}
        />
        <Route
            exact
            path={`${base}/create-report`}
            component={CreateReportContainer}
        />
        <Route exact path={`${base}/pin-options`} component={PinOptions} />
        <Route exact path={`${base}/support`} component={Support} />
        <Route
            exact
            path={`${base}/company-reports`}
            component={CompanyReportsContainer}
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
            path={`${base}/transfer-requests`}
            component={TransferRequests}
        />
    </SwitchWith404>
);

export default ToolsRoutes;
