import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import TemplateBuilderContainer from 'components/superAdmin/templateBuilder/templateBuilderOrig/containers/TemplateBuilderContainer';
import TemplateBuilderContainerDnD from 'components/superAdmin/templateBuilder/templateBuilderDnD/containers/TemplateBuilderContainer';

const TemplateBuilderRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={baseUrl} component={TemplateBuilderContainer} />
        <Route
            exact
            path={`${baseUrl}/dnd`}
            component={TemplateBuilderContainerDnD}
        />
    </SwitchWith404>
);

export default TemplateBuilderRoutes;
