import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EditProfilePasswordForm from 'components/shared/profile/editProfilePassword/presentational/EditProfilePasswordForm';

class EditProfilePasswordFormContainer extends Component {
    state = {
        password: '',
        confirmPassword: ''
    };

    render = () => (
        <EditProfilePasswordForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            validate={this.validatePassword}
            handleSubmit={this.handleSubmit}
        />
    );

    componentDidUpdate(prevProps) {
        const { postSuccess, history, location } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace('/edit-password', ''));
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const { id } = this.props.match.params;
        this.props.editProfilePassword(id, { password });
    };

    validatePassword = confirmPassword => {
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
    // editProfilePassword: (id, password) => {
    //     dispatch(editProfilePassword(id, password));
    // }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditProfilePasswordFormContainer)
);
