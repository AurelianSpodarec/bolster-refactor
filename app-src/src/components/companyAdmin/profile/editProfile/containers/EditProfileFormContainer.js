import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import EditProfileForm from '../presentational/EditProfileForm';

class EditProfileFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };

    render() {
        return (
            <EditProfileForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchProfile();
    };

    componentDidUpdate = prevProps => {
        const { isFetching, profile } = this.props;
        if (!isFetching && prevProps.isFetching) {
            // eslint-disable-next-line no-unused-vars
            const { profileImageS3Key, ...restProfile } = profile;
            this.setState({
                ...restProfile
            });
        }
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const postBody = { ...this.state };
        this.props.editProfile(postBody);
    };
}

const mapStateToProps = ({
    shared: {
        profileReducer: { isFetching, error, profile }
    }
}) => ({
    isFetching,
    error,
    profile
});

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => {
        return dispatch(fetchProfile());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfileFormContainer);
