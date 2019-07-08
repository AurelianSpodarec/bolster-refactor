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
    render = () => (
        <RequestDemoForm
            {...this.state}
            error={this.props.error}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />
    );

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();

        const { name, email, contactNumber, companyName } = this.state;

        const postBody = { name, email, contactNumber, companyName };

        this.props.postRequestDemo(postBody);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            this.setState({ sent: true });
        }
    };
}

const mapStateToProps = ({
    frontEnd: {
        requestDemoReducer: { error, postSuccess }
    }
}) => ({
    error,
    postSuccess
});

const mapDispatchToProps = { postRequestDemo };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestDemoFormContainer);
