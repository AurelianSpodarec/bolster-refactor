import React from 'react';
import { connect } from 'react-redux';

import UserGuidesPresentational from '../presentational/UserGuidePresentation';
import fetchUserGuide from 'actions/shared/userGuide/async/fetchUserGuide';

const UserGuideContainer = ({ userGuide }) => {
    return <UserGuidesPresentational userGuide={userGuide} />;
};

const mapDispatchToProps = dispatch => ({
    fetchUserGuide: () => dispatch(fetchUserGuide()),
});

const mapStateToProps = ({
    shared: {
        userGuideReducer: { userGuide, isFetching, error },
    },
}) => ({
    userGuide,
    isFetching,
    error,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserGuideContainer);
