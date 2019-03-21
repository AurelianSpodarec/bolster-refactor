import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from './SwitchWith404';
import TemplateBuilderContainer from 'components/templateBuilder/containers/TemplateBuilderContainer';

const TemplateBuilderRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={baseUrl} component={TemplateBuilderContainer} />
    </SwitchWith404>
);

export default TemplateBuilderRoutes;
