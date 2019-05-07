import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import editCompanyUserPassword from 'actions/companyAdmin/userManagement/async/editCompanyUserPassword';

import EditCompanyUserPassword from '../presentational/EditCompanyUserPasswordForm';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

class EditCompanyUserPasswordContainer extends Component {
    state = {
        password: '',
        confirmPassword: ''
    };

    render = () => (
        <EditCompanyUserPassword
            {...this.state}
            handleInputChange={this.handleInputChange}
            validateConfirmPassword={this.validateConfirmPassword}
            handleSubmit={this.handleSubmit}
        />
    );

    componentDidUpdate(prevProps) {
        const { postSuccess, history, location, match } = this.props;
        const { id } = match.params;
        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace(`/${id}/edit-password`, ''));
        }
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const { id } = this.props.match.params;
        this.props.editCompanyUserPassword(id, { password });
    };

    validatePassword = password => {
        const { confirmPassword } = this.state;
        const { addFieldError, removeFieldError } = this.props;
        if (password !== confirmPassword) {
            addFieldError('confirmPassword', 'Passwords do not match');
        } else {
            removeFieldError('confirmPassword');
        }
        return null;
    };

    validateConfirmPassword = confirmPassword => {
        const { password } = this.state;
        if (password !== confirmPassword) {
            return 'Password and Confirm Password do not match';
        }
    };
}

const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    postSuccess: companyUsersReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    editCompanyUserPassword: (id, password) => {
        dispatch(editCompanyUserPassword(id, password));
    },
    addFieldError: (field, err) => dispatch(addFieldError(field, err)),
    removeFieldError: field => dispatch(removeFieldError(field))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditCompanyUserPasswordContainer)
);
