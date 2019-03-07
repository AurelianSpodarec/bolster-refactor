import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import AllCreditLogs from 'components/creditLogs/allCreditLogs/presentational/AllCreditLogs';
import PinOptions from 'components/pins/pinOptions/presentational/PinOptions';
import Support from 'components/support/support/presentational/Support';

const ToolsRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route
            exact
            path={`${baseUrl}/credit-logs`}
            component={AllCreditLogs}
        />
        <Route exact path={`${baseUrl}/pin-options`} component={PinOptions} />
        <Route exact path={`${baseUrl}/support`} component={Support} />
    </SwitchWith404>
);

export default ToolsRoutes;
