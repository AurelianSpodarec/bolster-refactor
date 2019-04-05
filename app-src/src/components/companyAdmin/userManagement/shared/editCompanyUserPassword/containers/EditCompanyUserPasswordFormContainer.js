import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EditCompanyUserPassword from '../presentational/EditCompanyUserPassword';

class EditCompanyUserPasswordContainer extends Component {
    state = {
        password: '',
        confirmPassword: ''
    };
    render() {
        return (
            <EditCompanyUserPassword
                validate={this.validatePassword}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleSubmit = e => {
        e.preventDefault();
    };

    validatePassword = confirmPassword => {};
}

export default withRouter(connect()(EditCompanyUserPasswordContainer));
