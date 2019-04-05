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

    render = () => (
        <EditCompanyUserPassword
            handleInputChange={this.handleInputChange}
            validate={this.validatePassword}
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

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const { id } = this.props.match.params;
        this.props.editCompanyUserPassword(id, { password });
    };

    validatePassword = confirmPassword => {
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
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditCompanyUserPasswordContainer)
);
