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

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const postBody = {
            ...this.state
        };
        const { id } = this.props;
        this.props.editCompanyUser(id, postBody);
    };

    componentDidMount = () => {
        const { isFetching, user } = this.props;
        if (!isFetching && user)
            this.setState({
                firstName: user.userFirstName,
                lastName: user.userLastName,
                email: user.userEmail,
                phoneNumber: user.userPhoneNumber
            });
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            history,
            isFetching,
            user,
            location,
            match
        } = this.props;
        const { id } = match.params;
        if (user && !isFetching && prevProps.isFetching)
            this.setState({
                firstName: user.userFirstName,
                lastName: user.userLastName,
                email: user.userEmail,
                phoneNumber: user.userPhoneNumber
            });

        if (postSuccess && !prevProps.postSuccess) {
            history.push(location.pathname.replace(`/${id}/edit`, ''));
        }
    };
}
const mapStateToProps = (
    { companyAdmin: { companyUsersReducer } },
    {
        match: {
            params: { id }
        }
    }
) => ({
    user: companyUsersReducer.users[id],
    postSuccess: companyUsersReducer.postSuccess,
    error: companyUsersReducer.error,
    isFetching: companyUsersReducer.isFetching,
    id
});

const mapDispatchToProps = dispatch => ({
    editCompanyUser: (id, postBody) => {
        dispatch(editCompanyUser(id, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditCompanyUserFormContainer)
);
