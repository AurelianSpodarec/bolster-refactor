import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import postContactForm from 'actions/frontEnd/contact/async/postContactForm';
import ContactPageForm from '../presentational/ContactPageForm';
import { useForm } from 'helpers/hooks';

const ContactPageFormContainer = ({ error, postSuccess }) => {
    const [form, handleChange] = useForm({
        name: '',
        email: '',
        contactNumber: '',
        companyName: '',
        sent: false,
    });

    const handleSubmit = e => {
        e.preventDefault();

        const { name, email, contactNumber, companyName, message } = this.state;
        const { postContactForm } = this.props;

        const postBody = {
            name,
            email,
            contactNumber,
            companyName,
            message,
        };

        postContactForm(postBody);
    };

    useEffect(() => {
        if (postSuccess /*&& !prevProps.postSuccess*/) {
            handleChange({ sent: true });
        }
    }, [postSuccess]);

    return (
        <ContactPageForm
            {...form}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

const mapStateToProps = ({
    frontEnd: {
        contactReducer: { error, postSuccess },
    },
}) => ({
    error,
    postSuccess,
});

const mapDispatchToProps = { postContactForm };

export default connect(mapStateToProps, mapDispatchToProps)(ContactPageFormContainer);
