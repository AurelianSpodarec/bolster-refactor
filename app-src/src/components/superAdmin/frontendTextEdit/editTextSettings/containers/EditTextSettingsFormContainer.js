import React, { useEffect } from 'react';
import { useForm } from 'helpers/hooks';
import { connect } from 'react-redux';

import fetchLoginText from 'actions/superAdmin/frontendSite/textSettings/async/fetchLoginText';
import fetchRegisterText from 'actions/superAdmin/frontendSite/textSettings/async/fetchRegisterText';
import updateFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/updateFrontendText';

import EditTextSettingsForm from '../presentational/EditTextSettingsForm';
import { convertArrToObj } from 'helpers/generic';

const EditTextSettingsFormContainer = ({
    updateFrontendText,
    fetchLoginText,
    fetchRegisterText,
    isPosting,
    error,
    loginText,
    registerText,
}) => {
    const [formData, handleChange] = useForm({
        loginText: loginText || '',
        registerText: registerText || '',
    });

    useEffect(() => {
        fetchLoginText();
        fetchRegisterText();
    }, []);

    return (
        <EditTextSettingsForm
            {...formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );

    function handleSubmit(e) {
        e.preventDefault();
        updateFrontendText(formData);
    }
};

const mapStateToProps = ({
    superAdmin: {
        frontendTextSettingsReducer: { isPosting, error, loginText, registerText },
    },
}) => ({
    isPosting,
    error,
    loginText: loginText,
    registerText: registerText,
});

const mapDispatchToProps = { updateFrontendText, fetchLoginText, fetchRegisterText };

export default connect(mapStateToProps, mapDispatchToProps)(EditTextSettingsFormContainer);
