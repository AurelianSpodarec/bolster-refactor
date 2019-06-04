import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import CreateCompanyAdminForm from '../presentational/CreateCompanyAdminForm';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import createCompanyUser from 'actions/companyAdmin/userManagement/async/createCompanyUser';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class CreateCompanyAdminFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    };

    render() {
        return (
            <CreateCompanyAdminForm
                {...this.state}
                hideModal={this.props.hideModal}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                validatePassword={this.validatePassword}
                validateConfirmPassword={this.validateConfirmPassword}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, error } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Company Admin added successfully.'
            });
        }
        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    'There was an error processing your request, please try again later.'
            });
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...rest } = this.state;

        const postBody = {
            ...rest,
            type: COMPANY_USER_ROLE_TYPES.ADMIN
        };
        this.props.createCompanyUser(postBody);
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

    validateConfirmPassword = confirmPassword =>
        this.state.password !== confirmPassword
            ? 'Passwords do not match'
            : null;
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { postSuccess, error }
    }
}) => ({
    postSuccess,
    error
});

const mapDispatchToProps = {
    createCompanyUser,
    addFieldError,
    removeFieldError,
    hideModal,
    showModal
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateCompanyAdminFormContainer)
);
