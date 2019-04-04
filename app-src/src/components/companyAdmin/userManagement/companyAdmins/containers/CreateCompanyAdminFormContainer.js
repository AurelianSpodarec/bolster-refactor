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
        postcode: '',
        phoneNumber: '',
        password: ''
    };

    render() {
        return (
            <CreateCompanyAdminForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
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

        const {
            firstName,
            lastName,
            email,
            postcode,
            phoneNumber,
            password
        } = this.state;

        const postBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            postcode: postcode,
            phoneNumber: phoneNumber,
            password: password,
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
