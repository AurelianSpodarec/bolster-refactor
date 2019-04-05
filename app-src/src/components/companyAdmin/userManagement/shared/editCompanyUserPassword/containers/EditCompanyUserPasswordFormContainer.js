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
    (id, password) => {};
};

export default withRouter(connect()(EditCompanyUserPasswordContainer));
