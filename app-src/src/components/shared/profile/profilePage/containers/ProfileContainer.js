import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';

import Profile from '../presentational/Profile';

class ProfileContainer extends Component {
    render() {
        return <Profile />;
    }
    componentDidMount = () => {
        this.props.fetchProfile();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => dispatch(fetchProfile())
});

export default connect(
    null,
    mapDispatchToProps
)(ProfileContainer);
