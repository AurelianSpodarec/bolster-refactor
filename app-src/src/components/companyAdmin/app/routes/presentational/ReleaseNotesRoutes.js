import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ReleaseNotesContainer from 'components/companyAdmin/releaseNotes/containers/ReleaseNotesContainer';

const SettingsRoutes = ({ base = '/company/release-notes' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ReleaseNotesContainer} />
    </SwitchWith404>
);

export default SettingsRoutes;
