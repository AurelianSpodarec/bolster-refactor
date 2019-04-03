import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from '../SwitchWith404';
import AllCreditLogs from 'components/companyAdmin/creditLogs/allCreditLogs/presentational/AllCreditLogs';
import PinOptions from 'components/companyAdmin/pins/pinOptions/presentational/PinOptions';
import Support from 'components/companyAdmin/support/support/presentational/Support';
import GenerationQueueContainer from 'components/companyAdmin/generationQueue/shared/containers/GenerationQueueContainer';

const ToolsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/credit-logs`}
            component={AllCreditLogs}
        />
        <Route exact path={`${baseUrl}/pin-options`} component={PinOptions} />
        <Route exact path={`${baseUrl}/support`} component={Support} />
        <Route
            exact
            path={`${baseUrl}/generation-queue`}
            component={GenerationQueueContainer}
        />
    </SwitchWith404>
);

export default ToolsRoutes;
