import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EditProfilePasswordForm from 'components/shared/profile/editProfilePassword/presentational/EditProfilePasswordForm';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import changeProfilePassword from 'actions/shared/profile/async/changeProfilePassword';

class EditProfilePasswordFormContainer extends Component {
    state = {
        password: '',
        confirmPassword: ''
    };

    render = () => (
        <EditProfilePasswordForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            validatePassword={this.validatePassword}
            validateConfirmPassword={this.validateConfirmPassword}
            handleSubmit={this.handleSubmit}
        />
    );

    componentDidUpdate(prevProps) {
        const { postSuccess, history, location } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace('/change-password', ''));
        }
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const postBody = {
            password: password
        };

        this.props.changeProfilePassword(postBody);
    };

    validatePassword = password => {
        const { confirmPassword } = this.state;
        const { addFieldError, removeFieldError } = this.props;
        if (password !== confirmPassword) {
            addFieldError('confirmPassword', 'Passwords do not match');
        } else {
            removeFieldError('confirmPassword');
        }
        return null;
    };

    validateConfirmPassword = confirmPassword => {
        const { password } = this.state;
        if (password !== confirmPassword) {
            return 'Password and Confirm Password do not match';
        }
    };
}

const mapStateToProps = ({ shared: { profileReducer } }) => ({
    postSuccess: profileReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (field, err) => dispatch(addFieldError(field, err)),
    removeFieldError: field => dispatch(removeFieldError(field)),
    changeProfilePassword: (id, password) => {
        dispatch(changeProfilePassword(id, password));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditProfilePasswordFormContainer)
);
