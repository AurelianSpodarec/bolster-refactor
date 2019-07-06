import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postLogin from 'actions/shared/auth/async/postLogin';
import LoginForm from '../presentational/LoginForm';
import { authenticate } from 'helpers/api';
import { COMPANY_USER_ROLE_TYPES as ROLES } from 'constants/companyAdmin/enums';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { FORGOT_PASSWORD } from 'constants/shared/modalTypes';
import { FETCH_COMPANY_SETTINGS_SUCCESS } from 'constants/actionTypes/companySettings';

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
            handleForgotPassword={this.handleForgotPassword}
        />
    );

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();
        const { postLogin } = this.props;
        const { email, password } = this.state;
        postLogin(email, password);
    };

    handleForgotPassword = () => {
        this.props.showModal(FORGOT_PASSWORD);
    };

    componentDidUpdate = async prevProps => {
        const {
            postSuccess,
            history,
            addFieldError,
            showFieldErrors,
            fetchCompanySettings
        } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            const {
                isSuperAdmin,
                companyUserType,
                companyID
            } = await authenticate();
            if (+companyUserType === ROLES.OPERATIVE) {
                localStorage.removeItem('token');
                addFieldError(
                    'password',
                    'Operatives logins are not permitted to use the desktop site.'
                );
                showFieldErrors();
                return;
            }
            if (+companyUserType === ROLES.OWNER) {
                const { payload, type } = await fetchCompanySettings();
                if (type === FETCH_COMPANY_SETTINGS_SUCCESS) {
                    localStorage.setItem('colourCode', payload.colourCode);
                }
            }

            let url = '/client/companies';
            if (companyID) url = '/company';
            if (isSuperAdmin) url = '/admin';
            history.push(url);
        }
    };
}
const mapStateToProps = ({ shared: { loginReducer } }) => loginReducer;

const mapDispatchToProps = dispatch => ({
    postLogin: (email, password) => dispatch(postLogin(email, password)),
    addFieldError: (field, error) => dispatch(addFieldError(field, error)),
    showFieldErrors: () => dispatch(showFieldErrors()),
    fetchCompanySettings: () => dispatch(fetchCompanySettings()),
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);
