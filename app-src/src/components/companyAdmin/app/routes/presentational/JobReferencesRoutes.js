import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import JobReferences from 'components/companyAdmin/jobReferences/JobReferences';

const JobReferencesRoutes = ({ base = '/company/job-references' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={JobReferences} />
    </SwitchWith404>
);

export default JobReferencesRoutes;
