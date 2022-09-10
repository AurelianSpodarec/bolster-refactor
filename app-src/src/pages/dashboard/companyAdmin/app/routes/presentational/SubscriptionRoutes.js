import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import SubscriptionContainer from 'pages/dashboard/companyAdmin/subscription/subscriptionMenu/containers/SubscriptionContainer';

const SubscriptionRoutes = ({ base = '/company/subscription' }) => (
    <SwitchWith404>
        <Route exact path={base} component={SubscriptionContainer} />
    </SwitchWith404>
);

export default SubscriptionRoutes;
