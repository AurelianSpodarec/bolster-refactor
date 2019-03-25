import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createUser from 'actions/users/async/createUser';
import AddUserForm from '../presentational/AddUserForm';

class AddUserFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        isSuperAdmin: false
    };
    render() {
        return (
            <AddUserForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createUser } = this.props;
        const userBody = { ...this.state };

        createUser(userBody);
    };
}

const mapStateToProps = ({ usersReducer }) => ({
    postSuccess: usersReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    createUser: postBody => {
        dispatch(createUser(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddUserFormContainer)
);
