import React, { Component } from 'react';
import { connect } from 'react-redux';

import postRequestDemo from 'actions/frontEnd/requestDemo/async/postRequestDemo';

import RequestDemoForm from '../presentational/RequestDemoForm';

class RequestDemoFormContainer extends Component {
    state = {
        name: '',
        email: '',
        number: '',
        companyName: ''
    };
    render() {
        return <RequestDemoForm {...this.state} />;
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, email, number, companyName } = this.state;

        const postBody = {
            name: name,
            email: email,
            number: number,
            companyName: companyName
        };

        this.props.postRequestDemo(postBody);
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
