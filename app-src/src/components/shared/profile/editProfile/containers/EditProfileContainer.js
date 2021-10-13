import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import EditProfile from '../presentational/EditProfile';
import { componentDidMount } from 'helpers/generic';

const EditProfileContainer = () => {
    const { isFetching, error, profile } = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    componentDidMount(() => {
        dispatch(fetchProfile());
    });
    return <EditProfile error={error} isFetching={isFetching} profile={profile} />;
};

const mapStateToProps = ({
    shared: {
        profileReducer: { isFetching, error, profile },
    },
}) => ({
    isFetching,
    error,
    profile: profile || null,
});

export default EditProfileContainer;
