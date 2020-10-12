import React, { useEffect } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/fetchFrontendText';
import updateFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/updateFrontendText';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import EditTextSettingsForm from '../presentational/EditTextSettingsForm';

const EditTextSettingsFormContainer = ({
    updateFrontendText,
    isPosting,
    error,
    isFetching,
    frontendText,
    fetchFrontendText,
    postSuccess,
    history,
    showModal,
}) => {
    const { loginText, registerText } = frontendText;

    const [formData, handleChange] = useForm({
        loginText: loginText || '',
        registerText: registerText || '',
    });

    const prevProps = usePrevious({ isFetching, postSuccess, error });

    useEffect(() => {
        fetchFrontendText();
    }, []);

    useEffect(() => {
        if (!isFetching && prevProps.isFetching) {
            handleChange('loginText', loginText);
            handleChange('registerText', registerText);
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'The text has been successfully changed',
            });
            return history.replace('/admin/text-settings');
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                title: error.title || 'Error',
                message: error.message,
            });
        }
    }, [
        isFetching,
        prevProps.isFetching,
        postSuccess,
        prevProps.postSuccess,
        error,
        prevProps.error,
    ]);

    return (
        <EditTextSettingsForm
            {...formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isPosting={isPosting}
        />
    );

    function handleSubmit(e) {
        e.preventDefault();
        updateFrontendText(formData);
    }
};

const mapStateToProps = ({
    superAdmin: {
        frontendTextSettingsReducer: { isPosting, error, frontendText, isFetching, postSuccess },
    },
}) => ({
    isPosting,
    error,
    isFetching,
    frontendText,
    postSuccess,
});

const mapDispatchToProps = { updateFrontendText, fetchFrontendText, showModal };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditTextSettingsFormContainer),
);
