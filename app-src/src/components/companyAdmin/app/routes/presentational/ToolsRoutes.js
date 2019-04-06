import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllCreditLogs from 'components/companyAdmin/creditLogs/allCreditLogs/presentational/AllCreditLogs';
import PinOptions from 'components/companyAdmin/pins/pinOptions/presentational/PinOptions';
import Support from 'components/companyAdmin/support/support/presentational/Support';
import GenerationQueueContainer from 'components/companyAdmin/generationQueue/shared/containers/GenerationQueueContainer';

const ToolsRoutes = ({ base = '/company/tools' }) => (
    <SwitchWith404>
        <Route exact path={`${base}/credit-logs`} component={AllCreditLogs} />
        <Route exact path={`${base}/pin-options`} component={PinOptions} />
        <Route exact path={`${base}/support`} component={Support} />
        <Route
            exact
            path={`${base}/generation-queue`}
            component={GenerationQueueContainer}
        />
    </SwitchWith404>
);

export default ToolsRoutes;
