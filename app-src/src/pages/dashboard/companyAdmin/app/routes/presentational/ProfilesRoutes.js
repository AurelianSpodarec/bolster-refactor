import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ProfileContainer from 'components/shared/profile/profilePage/containers/ProfileContainer';
import EditProfileContainer from 'components/shared/profile/editProfile/containers/EditProfileContainer';
import SetupTwoFactorContainer from 'components/shared/profile/twoFactor/setupTwoFactor/SetupTwoFactorContainer';
import EditProfilePassword from 'components/shared/profile/editProfilePassword/presentational/EditProfilePassword';
import EditProfileEmail from 'components/shared/profile/editProfileEmail/EditProfileEmail';
import EditMailPreferences from 'components/shared/profile/editMailPreferences/EditMailPreferences';

const ProfilesRoutes = ({ base = '/company/profile' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ProfileContainer} />
        <Route exact path={`${base}/edit`} component={EditProfileContainer} />
        <Route exact path={`${base}/change-password`} component={EditProfilePassword} />
        <Route exact path={`${base}/change-email`} component={EditProfileEmail} />
        <Route exact path={`${base}/twofactor/setup`} component={SetupTwoFactorContainer} />
        <Route exact path={`${base}/mailPreferences`} component={EditMailPreferences} />
    </SwitchWith404>
);

export default ProfilesRoutes;
