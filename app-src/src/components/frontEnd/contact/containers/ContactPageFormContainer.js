import React, { Component } from 'react';
import { connect } from 'react-redux';

import postContactForm from 'actions/frontEnd/contact/async/postContactForm';

import ContactPageForm from '../presentational/ContactPageForm';

class ContactPageFormContainer extends Component {
    state = {
        name: '',
        email: '',
        number: '',
        companyName: '',
        message: ''
    };

    render() {
        return (
            <ContactPageForm
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

        const { name, email, number, companyName, message } = this.state;

        const postBody = {
            name: name,
            email: email,
            number: number,
            companyName: companyName,
            message: message
        };

        this.props.postContactForm(postBody);
    };
}

const mapStateToProps = ({
    frontEnd: {
        contactReducer: { error, postSuccess }
    }
}) => ({
    error: error,
    postSuccess: postSuccess
});

const mapDispatchToProps = dispatch => ({
    postContactForm: postBody => dispatch(postContactForm(postBody))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactPageFormContainer);
