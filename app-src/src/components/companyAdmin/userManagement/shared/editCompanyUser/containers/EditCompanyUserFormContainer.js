import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editCompanyUser from 'actions/companyAdmin/userManagement/async/editCompanyUser';
import EditCompanyUserForm from '../presentational/EditCompanyUserForm';

class EditCompanyUserFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };

    render() {
        return (
            <EditCompanyUserForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const postBody = {
            ...this.state
        };
        const { id } = this.props;
        this.props.editCompanyUser(id, postBody);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push('/users-management/operatives');
        }
    };
}
const mapStateToProps = (
    { companyAdmin: { companyUsersReducer } },
    { match }
) => ({
    postSuccess: companyUsersReducer.postSuccess,
    error: companyUsersReducer.error,
    id: match.params.id
});

const mapDispatchToProps = dispatch => ({
    editCompanyUser: postBody => {
        dispatch(editCompanyUser(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditCompanyUserFormContainer)
);
