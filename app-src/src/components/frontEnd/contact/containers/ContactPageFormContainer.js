import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import postContactForm from 'actions/frontEnd/contact/async/postContactForm';
import ContactPageForm from '../presentational/ContactPageForm';
import { useForm, usePrevious } from 'helpers/hooks';

const ContactPageFormContainer = ({ error, postSuccess, postContactForm }) => {
    const [formData, handleChange] = useForm({
        name: '',
        email: '',
        contactNumber: '',
        companyName: '',
        recaptchaToken: '',
    });
    const [sent, setSent] = useState(false);

    const prevProps = usePrevious({ postSuccess });

    const handleSubmit = e => {
        e.preventDefault();

        postContactForm(formData);
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            setSent(true);
        }
    }, [postSuccess]);

    return (
        <ContactPageForm
            error={error}
            form={formData}
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
