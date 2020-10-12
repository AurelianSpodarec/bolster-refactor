import React, { useEffect } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
import { connect } from 'react-redux';

import fetchFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/fetchFrontendText';
import updateFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/updateFrontendText';

import EditTextSettingsForm from '../presentational/EditTextSettingsForm';

const EditTextSettingsFormContainer = ({
    updateFrontendText,
    fetchLoginText,
    fetchRegisterText,
    isPosting,
    error,
    isFetching,
    loginText,
    registerText,
}) => {
    const [formData, handleChange] = useForm({
        loginText: loginText.text || '',
        registerText: registerText.text || '',
    });
    console.log(formData);
    const prevProps = usePrevious({ isFetching });

    useEffect(() => {
        fetchLoginText();
        fetchRegisterText();
    }, []);

    useEffect(() => {
        if (!isFetching && isFetching !== prevProps.isFetching) {
            handleChange('loginText', loginText.text);
            handleChange('registerText', registerText.text);
        }
    }, [isFetching, prevProps.isFetching]);

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
        frontendTextSettingsReducer: { isPosting, error, frontendText, isFetching },
    },
}) => ({
    isPosting,
    error,
    isFetching,
    frontendText,
});

const mapDispatchToProps = { updateFrontendText, fetchFrontendText };

export default connect(mapStateToProps, mapDispatchToProps)(EditTextSettingsFormContainer);
