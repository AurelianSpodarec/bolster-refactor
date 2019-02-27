import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../presentational/Login';

import clearFieldErrors from 'actions/generic/sync/fieldErrors/clearFieldErrors';
import addFieldError from 'actions/generic/sync/fieldErrors/addFieldError';

class LoginContainer extends Component {
    state = {
        email: '',
        password: ''
    };
    render() {
        return (
            <Login
                {...this.state}
                handleInputChange={this.handleInputChange}
                validateEmail={this.validateEmail}
            />
        );
    }

    componentDidMount = () => {
        this.props.clearFieldErrors();
    };
    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };
    validateEmail = value => {
        if (!(value && value.includes('@')))
            return 'This is not a valid email.';

        if (value && value.length < 4) return 'This email is too short.';
    };
}
const mapDispatchToProps = dispatch => ({
    clearFieldErrors: () => {
        dispatch(clearFieldErrors());
    },
    addFieldError: (fieldName, error) => {
        dispatch(addFieldError(fieldName, error));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(LoginContainer);
