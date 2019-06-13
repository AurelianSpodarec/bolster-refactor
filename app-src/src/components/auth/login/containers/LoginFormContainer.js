import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postLogin from 'actions/shared/auth/async/postLogin';
import LoginForm from '../presentational/LoginForm';
import { authenticate } from 'helpers/api';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';

class LoginFormContainer extends Component {
    state = {
        email: '',
        password: ''
    };

    render = () => (
        <LoginForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
        />
    );

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();
        const { postLogin } = this.props;
        const { email, password } = this.state;
        postLogin(email, password);
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            history,
            addFieldError,
            showFieldErrors,
            fetchCompanySettings
        } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            authenticate().then(
                ({ isSuperAdmin, isClientAccess, companyUserType }) => {
                    if (
                        +companyUserType === COMPANY_USER_ROLE_TYPES.OPERATIVE
                    ) {
                        localStorage.removeItem('token');
                        addFieldError(
                            'password',
                            'Operatives logins are not permitted to use the desktop site.'
                        );
                        showFieldErrors();
                    } else if (
                        +companyUserType === COMPANY_USER_ROLE_TYPES.OWNER
                    ) {
                        fetchCompanySettings()
                            .then(payload => {
                                localStorage.setItem(
                                    'colourCode',
                                    payload.payload.colourCode
                                );
                            })
                            .then(() =>
                                history.push(
                                    isSuperAdmin
                                        ? '/admin'
                                        : isClientAccess
                                        ? '/client'
                                        : '/company'
                                )
                            );
                    } else
                        history.push(
                            isSuperAdmin
                                ? '/admin'
                                : isClientAccess
                                ? '/client'
                                : '/company'
                        );
                }
            );
        }
    };
}
const mapStateToProps = ({ shared: { loginReducer } }) => loginReducer;

const mapDispatchToProps = dispatch => ({
    postLogin: (email, password) => dispatch(postLogin(email, password)),
    addFieldError: (field, error) => dispatch(addFieldError(field, error)),
    showFieldErrors: () => dispatch(showFieldErrors()),
    fetchCompanySettings: () => dispatch(fetchCompanySettings())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);
