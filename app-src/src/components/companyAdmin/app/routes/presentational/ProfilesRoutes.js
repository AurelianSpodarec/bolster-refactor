import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ProfileContainer from 'components/companyAdmin/profile/profilePage/containers/ProfileContainer';
import EditProfileFormContainer from 'components/companyAdmin/profile/editProfile/containers/EditProfileFormContainer';

const ProfilesRoutes = ({ base = '/company/profile' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ProfileContainer} />
        <Route
            exact
            path={`${base}/edit`}
            component={EditProfileFormContainer}
        />
    </SwitchWith404>
);

export default ProfilesRoutes;
