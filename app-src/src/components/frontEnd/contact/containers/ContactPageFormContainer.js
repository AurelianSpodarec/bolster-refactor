import React, { useEffect } from 'react';
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
        sent: false,
    });

    const prevProps = usePrevious({ postSuccess });

    const handleSubmit = e => {
        console.log('in handle submit');
        e.preventDefault();

        const postBody = { ...formData };

        postContactForm(postBody);
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            handleChange({ sent: true });
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
