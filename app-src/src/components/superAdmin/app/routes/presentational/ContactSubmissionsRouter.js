import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllContactSubmissionsContainer from 'components/superAdmin/contactSubmissions/shared/containers/AllContactSubmissionsContainer';
import SingleContactSubmissionContainer from 'components/superAdmin/contactSubmissions/singleContactSubmission/containers/SingleContactSubmissionContainer';

const ContactSubmissionsRoutes = ({ base = '/admin/contact-submissions' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={AllContactSubmissionsContainer} />
        <Route path={`${base}/:id`} component={SingleContactSubmissionContainer} />
    </SwitchWith404>
);

export default ContactSubmissionsRoutes;
