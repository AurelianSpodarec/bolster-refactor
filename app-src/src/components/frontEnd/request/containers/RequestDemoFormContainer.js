import React, { Component } from 'react';
import { connect } from 'react-redux';

import postRequestDemo from 'actions/frontEnd/requestDemo/async/postRequestDemo';

import RequestDemoForm from '../presentational/RequestDemoForm';

class RequestDemoFormContainer extends Component {
    state = {
        name: '',
        email: '',
        contactNumber: '',
        companyName: '',
        sent: false
    };
    render() {
        return (
            <RequestDemoForm
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, email, contactNumber, companyName } = this.state;

        const postBody = {
            name: name,
            email: email,
            contactNumber: contactNumber,
            companyName: companyName
        };

        this.props.postRequestDemo(postBody);
        this.setState({ sent: true });
    };
}

const mapStateToProps = ({
    frontEnd: {
        requestDemoReducer: { error, postSuccess }
    }
}) => ({
    error: error,
    postSuccess: postSuccess
});

const mapDispatchToProps = dispatch => ({
    postRequestDemo: postBody => dispatch(postRequestDemo(postBody))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestDemoFormContainer);
