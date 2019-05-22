import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postLogin from 'actions/shared/auth/async/postLogin';
import { authenticate } from 'helpers/api';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import CompanySelectionForm from '../presentational/CompanySelectionForm';

class CompanySelectionContainer extends Component {
    state = {
        selectedCompanyID: null
    };

    render = () => (
        <CompanySelectionForm
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
            showFieldErrors
        } = this.props;

        // if (postSuccess && !prevProps.postSuccess) {
        //     authenticate().then(({ isSuperAdmin, companyUserType }) => {
        //         if (+companyUserType === COMPANY_USER_ROLE_TYPES.OPERATIVE) {
        //             localStorage.removeItem('token');
        //             addFieldError(
        //                 'password',
        //                 'Operatives logins are not permitted to use the desktop site.'
        //             );
        //             showFieldErrors();
        //         } else history.push(isSuperAdmin ? '/admin' : '/company');
        //     });
        // }
    };
}

export default withRouter(connect()(CompanySelectionContainer));
