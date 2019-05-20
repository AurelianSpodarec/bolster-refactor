import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ProfileContainer from 'components/shared/profile/profilePage/containers/ProfileContainer';
import EditProfileContainer from 'components/shared/profile/editProfile/containers/EditProfileContainer';
import EditProfilePasswordContainer from 'components/shared/profile/editProfilePassword/containers/EditProfilePasswordContainer';

const ProfilesRoutes = ({ base = '/client/profile' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ProfileContainer} />
        <Route exact path={`${base}/edit`} component={EditProfileContainer} />
        <Route
            exact
            path={`${base}/change-password`}
            component={EditProfilePasswordContainer}
        />
    </SwitchWith404>
);

export default ProfilesRoutes;
