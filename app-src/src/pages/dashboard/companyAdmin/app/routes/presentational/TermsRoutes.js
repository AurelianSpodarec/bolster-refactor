import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import Terms from 'components_DEPRECATED/shared/terms/Terms';

const SubscriptionRoutes = ({ base = '/company/terms' }) => (
    <SwitchWith404>
        <Route exact path={base} component={Terms} />
    </SwitchWith404>
);

export default SubscriptionRoutes;
