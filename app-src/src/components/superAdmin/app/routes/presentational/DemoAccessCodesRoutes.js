import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import DemoAccessCodesContainer from 'components/superAdmin/demoAccessCodes/containers/DemoAccessCodesContainer';

const DemoAccessCodesRoutes = ({ base = '/admin/demo-access-codes' }) => (
    <SwitchWith404>
        <Route exact path={base} component={DemoAccessCodesContainer} />
    </SwitchWith404>
);

export default DemoAccessCodesRoutes;
