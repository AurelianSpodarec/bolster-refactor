import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import EditProfile from '../presentational/EditProfile';

class EditProfileContainer extends Component {
    render() {
        const { error, isFetching, profile } = this.props;
        return (
            <EditProfile
                error={error}
                isFetching={isFetching}
                profile={profile}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchProfile();
    };
}

const mapStateToProps = ({
    shared: {
        profileReducer: { isFetching, error, profile }
    }
}) => ({
    isFetching,
    error,
    profile: profile || null
});

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => {
        return dispatch(fetchProfile());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditProfileContainer)
);
