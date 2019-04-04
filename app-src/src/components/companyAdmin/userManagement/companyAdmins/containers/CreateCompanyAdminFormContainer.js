import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createCompanyAdmin from 'actions/companyAdmin/userManagement/async/createCompanyAdmin';
import CreateCompanyAdminForm from '../presentational/CreateCompanyAdminForm';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

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
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                validateConfirmPassword={this.validateConfirmPassword}
            />
        );
    }

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...rest } = this.state;

        const postBody = {
            ...rest,
            type: COMPANY_USER_ROLE_TYPES.ADMIN
        };
        this.props.createCompanyAdmin(postBody);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push('/users-management/company-admins');
        }
    };

    validateConfirmPassword = confirmPassword =>
        this.state.password !== confirmPassword
            ? 'Passwords do not match'
            : null;
}
const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    postSuccess: companyUsersReducer.postSuccess,
    error: companyUsersReducer.error
});

const mapDispatchToProps = dispatch => ({
    createCompanyAdmin: postBody => {
        dispatch(createCompanyAdmin(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateCompanyAdminFormContainer)
);
