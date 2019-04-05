import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import editCompanyUserPassword from 'actions/companyAdmin/userManagement/async/editCompanyUserPassword';

import EditCompanyUserPassword from '../presentational/EditCompanyUserPasswordForm';

class EditCompanyUserPasswordContainer extends Component {
    state = {
        password: '',
        confirmPassword: ''
    };

    render() {
        const { type } = this.props;
        return (
            <EditCompanyUserPassword
                validate={this.validatePassword}
                handleSubmit={this.handleSubmit}
                type={type}
            />
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const { id, editPassword } = this.props;
        editPassword(id, { password });
    };

    validatePassword = confirmPassword => {
        const { password } = this.state;
        if (password !== confirmPassword) {
            return 'Password and Confirm Password do not match';
        }
    };
}

const mapDispatchToProps = dispatch => {
    (id, password) => {
        dispatch(editCompanyUserPassword(id, password));
    };
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(EditCompanyUserPasswordContainer)
);
