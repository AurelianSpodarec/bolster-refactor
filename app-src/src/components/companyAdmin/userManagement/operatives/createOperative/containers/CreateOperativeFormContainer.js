import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createCompanyUser from 'actions/companyAdmin/userManagement/async/createCompanyUser';
import CreateOperativeForm from '../presentational/CreateOperativeForm';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class CreateOperativeFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    };

    render = () => (
        <CreateOperativeForm
            {...this.state}
            hideModal={this.props.hideModal}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            validatePassword={this.validatePassword}
            validateConfirmPassword={this.validateConfirmPassword}
        />
    );

    handleInputChange = (name, value) => this.setState({ [name]: value });

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

    handleSubmit = e => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, phoneNumber, ...restForm } = this.state;
        const postBody = {
            ...restForm,
            type: COMPANY_USER_ROLE_TYPES.OPERATIVE
        };
        if (phoneNumber) postBody.phoneNumber = phoneNumber;

        this.props.createCompanyUser(postBody);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/users-management/operatives');
        }
    };
}
const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    postSuccess: companyUsersReducer.postSuccess,
    error: companyUsersReducer.error
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
    )(CreateOperativeFormContainer)
);
