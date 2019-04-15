import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TransferRequests from 'components/companyAdmin/transferRequests/presentational/TransferRequests';

const TransferRequestsRoutes = ({ base = '/company/transfer-requests' }) => (
    <SwitchWith404>
        <Route exact path={base} component={TransferRequests} />
    </SwitchWith404>
);

export default TransferRequestsRoutes;
