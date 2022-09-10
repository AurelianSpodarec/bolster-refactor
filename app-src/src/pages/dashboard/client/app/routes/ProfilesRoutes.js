import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import ProfileContainer from 'components_DEPRECATED/shared/profile/profilePage/containers/ProfileContainer';
import EditProfileContainer from 'components_DEPRECATED/shared/profile/editProfile/containers/EditProfileContainer';
import SetupTwoFactorContainer from 'components_DEPRECATED/shared/profile/twoFactor/setupTwoFactor/SetupTwoFactorContainer';
import EditProfilePassword from 'components_DEPRECATED/shared/profile/editProfilePassword/presentational/EditProfilePassword';

const ProfilesRoutes = ({ base = '/client/profile' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ProfileContainer} />
        <Route exact path={`${base}/edit`} component={EditProfileContainer} />
        <Route exact path={`${base}/change-password`} component={EditProfilePassword} />
        <Route exact path={`${base}/twofactor/setup`} component={SetupTwoFactorContainer} />
    </SwitchWith404>
);

export default ProfilesRoutes;
