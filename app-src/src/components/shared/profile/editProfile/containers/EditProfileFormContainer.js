import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import editProfile from 'actions/shared/profile/async/editProfile';

import EditProfileForm from '../presentational/EditProfileForm';

class EditProfileFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        profileImageS3Key: '',
        currentProfileImage: ''
    };

    render() {
        return (
            <EditProfileForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleImageChange={this.handleImageChange}
            />
        );
    }

    componentDidMount = () => {
        const { profile } = this.props;
        this._setFormDetails(profile);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/profile');
        }
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleImageChange = (name, value) => {
        this.setState(prevState => {
            return {
                [name]: value === prevState[name] ? '' : value
            };
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            profileImageS3Key,
            currentProfileImage,
            ...restForm
        } = this.state;
        // check if image should stay the same or be changed to a new value
        const image = profileImageS3Key
            ? profileImageS3Key
            : currentProfileImage;
        const postBody = { profileImageS3Key: image, ...restForm };
        this.props.editProfile(postBody);
    };

    _setFormDetails = profile => {
        // eslint-disable-next-line no-unused-vars
        const currentS3Key = this.setState({
            ...profile,
            profileImageS3Key: '',
            currentProfileImage: profile.profileImageS3Key
        });
    };
}

const mapStateToProps = ({
    shared: {
        profileReducer: { isFetching, error, profile, postSuccess }
    }
}) => ({
    isFetching,
    error,
    profile,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => {
        return dispatch(fetchProfile());
    },
    editProfile: postBody => {
        return dispatch(editProfile(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditProfileFormContainer)
);
