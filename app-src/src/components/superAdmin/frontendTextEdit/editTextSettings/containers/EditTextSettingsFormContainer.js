import React, { useEffect } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
import { connect } from 'react-redux';

import fetchFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/fetchFrontendText';
import updateFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/updateFrontendText';

import EditTextSettingsForm from '../presentational/EditTextSettingsForm';

const EditTextSettingsFormContainer = ({
    updateFrontendText,
    isPosting,
    error,
    isFetching,
    frontendText,
    fetchFrontendText,
}) => {
    const { loginText, registerText } = frontendText;

    const [formData, handleChange] = useForm({
        loginText: loginText || '',
        registerText: registerText || '',
    });

    const prevProps = usePrevious({ isFetching });

    useEffect(() => {
        fetchFrontendText();
    }, []);

    useEffect(() => {
        if (!isFetching && isFetching !== prevProps.isFetching) {
            handleChange('loginText', loginText);
            handleChange('registerText', registerText);
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
