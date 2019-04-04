import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createCompanyUser from 'actions/companyAdmin/userManagement/async/createCompanyUser';
import CreateOperativeForm from '../presentational/CreateOperativeForm';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

class CreateOperativeFormContainer extends Component {
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
            <CreateOperativeForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                validatePassword={this.validatePassword}
            />
        );
    }

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validatePassword = confirmPassword => {
        const { password } = this.state;
        if (password !== confirmPassword) {
            return 'Password and Confirm Password do not match';
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        const { confirmPassword, ...restForm } = this.state;
        const postBody = {
            ...restForm,
            type: COMPANY_USER_ROLE_TYPES.OPERATIVE
        };

        this.props.createCompanyUser(postBody);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push('/users-management/operatives');
        }
    };
}
const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    postSuccess: companyUsersReducer.postSuccess,
    error: companyUsersReducer.error
});

const mapDispatchToProps = dispatch => ({
    createCompanyUser: postBody => {
        dispatch(createCompanyUser(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateOperativeFormContainer)
);
