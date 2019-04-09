import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ProfileContainer from 'components/companyAdmin/profile/containers/ProfileContainer';

const ProfilesRoutes = ({ base = '/company/profile' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ProfileContainer} />
    </SwitchWith404>
);

export default ProfilesRoutes;
