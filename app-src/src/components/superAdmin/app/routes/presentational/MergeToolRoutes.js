import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import MergeTool from 'components/superAdmin/siteManagement/mergeTool/presentational/MergeTool';

const MergeToolRoutes = ({ base = '/admin/merge-tool' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={MergeTool} />
    </SwitchWith404>
);

export default MergeToolRoutes;
