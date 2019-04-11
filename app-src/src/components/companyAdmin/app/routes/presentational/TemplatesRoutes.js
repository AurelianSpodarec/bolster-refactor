import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TemplatesContainer from 'components/companyAdmin/templates/allTemplates/containers/TemplatesContainer';
import SingleTemplateContainer from 'components/companyAdmin/templates/singleTemplate/containers/SingleTemplateContainer';

const TemplatesRoutes = ({ base = '/company/templates' }) => (
    <SwitchWith404>
        <Route exact path={base} component={TemplatesContainer} />
        <Route path={`${base}/:id`} component={SingleTemplateContainer} />
    </SwitchWith404>
);

export default TemplatesRoutes;
