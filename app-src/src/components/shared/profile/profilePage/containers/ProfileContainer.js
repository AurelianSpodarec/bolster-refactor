import React from 'react';
import { useDispatch } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';

import Profile from '../presentational/Profile';
import { componentDidMount } from 'helpers/generic';

const ProfileContainer = () => {
    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(fetchProfile());
    });

    return <Profile />;
};

export default ProfileContainer;
