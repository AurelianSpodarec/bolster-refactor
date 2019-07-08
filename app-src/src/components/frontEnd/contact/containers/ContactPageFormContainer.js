import React, { Component } from 'react';
import { connect } from 'react-redux';

import postContactForm from 'actions/frontEnd/contact/async/postContactForm';
import ContactPageForm from '../presentational/ContactPageForm';

class ContactPageFormContainer extends Component {
    state = {
        name: '',
        email: '',
        contactNumber: '',
        companyName: '',
        message: '',
        sent: false
    };

    render = () => (
        <ContactPageForm
            {...this.state}
            error={this.props.error}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />
    );

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();

        const { name, email, contactNumber, companyName, message } = this.state;
        const { postContactForm } = this.props;

        const postBody = {
            name,
            email,
            contactNumber,
            companyName,
            message
        };

        postContactForm(postBody);
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
        contactReducer: { error, postSuccess }
    }
}) => ({
    error,
    postSuccess
});

const mapDispatchToProps = { postContactForm };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactPageFormContainer);
