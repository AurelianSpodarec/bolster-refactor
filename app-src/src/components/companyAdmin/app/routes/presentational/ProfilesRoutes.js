import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ProfileContainer from 'components/companyAdmin/profile/profilePage/containers/ProfileContainer';
import EditProfileContainer from 'components/companyAdmin/profile/editProfile/containers/EditProfileContainer';

const ProfilesRoutes = ({ base = '/company/profile' }) => (
    <SwitchWith404>
        <Route exact path={base} component={ProfileContainer} />
        <Route exact path={`${base}/edit`} component={EditProfileContainer} />
    </SwitchWith404>
);

export default ProfilesRoutes;
