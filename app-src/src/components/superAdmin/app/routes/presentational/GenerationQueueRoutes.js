import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import GenerationQueueContainer from 'components/companyAdmin/generationQueue/shared/containers/GenerationQueueContainer';

const GenerationQueueRoutes = ({ base = '/admin/generation-queue' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={GenerationQueueContainer} />
    </SwitchWith404>
);

export default GenerationQueueRoutes;
