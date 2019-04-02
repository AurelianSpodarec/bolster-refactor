import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingForm from '../presentational/CreateBuildingForm';
import createOperative from 'actions/companyAdmin/userManagement/async/createOperative';

class CreateOperativeFormContainer extends Component {
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
            <CreateBuildingForm
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
            type: '50'
        };
        this.props.createOperative(postBody);
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
    createOperative: postBody => {
        dispatch(createOperative(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateOperativeFormContainer)
);
