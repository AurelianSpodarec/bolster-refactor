import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import postContactForm from 'actions/frontEnd/contact/async/postContactForm';
import ContactPageForm from '../presentational/ContactPageForm';
import { useForm, usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

const ContactPageFormContainer = ({
    error,
    postSuccess,
    postContactForm,
    isPosting,
    showModal,
}) => {
    const [formData, handleChange] = useForm({
        name: '',
        email: '',
        contactNumber: '',
        companyName: '',
        reCaptchaToken: '',
    });
    const [sent, setSent] = useState(false);

    const prevProps = usePrevious({ postSuccess, isPosting });

    const handleSubmit = e => {
        e.preventDefault();

        postContactForm(formData);
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            setSent(true);
        }

        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, {
                message: 'There was an error with your request. Please try again.',
            });
        }
    }, [postSuccess, prevProps.postSuccess, isPosting, prevProps.isPosting]);

    return (
        <ContactPageForm
            error={error}
            form={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            sent={sent}
            isPosting={isPosting}
        />
    );
};

const mapStateToProps = ({
    frontEnd: {
        contactReducer: { error, postSuccess, isPosting },
    },
}) => ({
    error,
    postSuccess,
    isPosting,
});

const mapDispatchToProps = { postContactForm, showModal };

export default connect(mapStateToProps, mapDispatchToProps)(ContactPageFormContainer);
