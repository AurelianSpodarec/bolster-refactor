import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postLogin from 'actions/shared/auth/async/postLogin';
import LoginForm from '../presentational/LoginForm';
import { authenticate } from 'helpers/api';

class LoginFormContainer extends Component {
    state = {
        email: '',
        password: ''
    };

    render() {
        return (
            <LoginForm
                {...this.state}
                handleInputChange={this.handleInputChange}
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

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        this.props.postLogin(email, password);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            authenticate().then(({ isSuperAdmin }) => {
                history.push(isSuperAdmin ? '/admin' : '/company');
            });
        }
    };
}
const mapStateToProps = ({ shared: { loginReducer } }) => loginReducer;

const mapDispatchToProps = dispatch => ({
    postLogin: (email, password) => {
        dispatch(postLogin(email, password));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);
