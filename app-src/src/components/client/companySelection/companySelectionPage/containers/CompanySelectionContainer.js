import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompanySelectionForm from '../presentational/CompanySelectionForm';

class CompanySelectionContainer extends Component {
    state = {
        selectedCompany: null,
        companyOptions: [
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
            { value: 3, label: 'Option 3' }
        ]
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

    // componentDidUpdate = prevProps => {
    //     const {
    //         postSuccess,
    //         history,
    //         addFieldError,
    //         showFieldErrors
    //     } = this.props;

    //     // if (postSuccess && !prevProps.postSuccess) {
    //     //     authenticate().then(({ isSuperAdmin, companyUserType }) => {
    //     //         if (+companyUserType === COMPANY_USER_ROLE_TYPES.OPERATIVE) {
    //     //             localStorage.removeItem('token');
    //     //             addFieldError(
    //     //                 'password',
    //     //                 'Operatives logins are not permitted to use the desktop site.'
    //     //             );
    //     //             showFieldErrors();
    //     //         } else history.push(isSuperAdmin ? '/admin' : '/company');
    //     //     });
    //     // }
    // };
}

export default withRouter(connect()(CompanySelectionContainer));
