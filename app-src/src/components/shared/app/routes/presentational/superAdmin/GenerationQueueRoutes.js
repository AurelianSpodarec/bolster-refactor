import React from 'react';
import { Route } from 'react-router-dom';
import SwitchWith404 from '../SwitchWith404';
import GenerationQueueContainer from 'components/companyAdmin/generationQueue/shared/containers/GenerationQueueContainer';

const GenerationQueueRoutes = ({ match: { url: baseUrl } }) => (
    <SwitchWith404>
        <Route exact path={`${baseUrl}`} component={GenerationQueueContainer} />
    </SwitchWith404>
);

export default GenerationQueueRoutes;
