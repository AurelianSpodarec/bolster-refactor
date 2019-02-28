import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../presentational/Login';

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
                handleSubmit={this.handleSubmit}
            />
        );
    }

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

    handleSubmit = e => {
        e.preventDefault();

        console.log('hi');
    };
}
const mapDispatchToProps = dispatch => ({});

export default connect(
    null,
    mapDispatchToProps
)(LoginContainer);
