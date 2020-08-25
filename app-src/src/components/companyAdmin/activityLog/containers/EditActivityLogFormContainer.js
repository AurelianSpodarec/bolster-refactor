import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postActivityLogSettings from 'actions/companyAdmin/activityLog/async/postActivityLogSettings';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    ACTIVITY_LOG_REFERENCE_VALUES,
    ACTIVITY_LOG_ACTION_VALUES,
} from 'constants/companyAdmin/enums';
import { useForm, usePrevious } from 'helpers/hooks';

import EditActivityLogForm from '../presentational/EditActivityLogForm';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

const EditActivityLogFormContainer = ({
    settings,
    postActivityLogSettings,
    showModal,
    isPosting,
    success,
    error,
    history,
}) => {
    const [form, handleChange] = useState({});

    const prevProps = usePrevious({ isPosting });

    useEffect(() => {
        let initialState = {};

        settings.forEach(setting => {
            const key = `reference-${setting.referenceType}-action-${setting.actionType}`;

            initialState[key] = true;
        });

        handleChange({
            ...initialState,
        });
    }, []);

    useEffect(() => {
        if (prevProps.isPosting && !isPosting && success) {
            history.push('/company/activity-log');
        }

        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, { message: error });
        }
    }, [isPosting, prevProps.isPosting, success, error]);

    return (
        <EditActivityLogForm
            settings={settings}
            form={form}
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmit}
            sections={getSections()}
            actions={getActions()}
            isPosting={isPosting}
        />
    );

    function getSections() {
        const sections = Object.keys(ACTIVITY_LOG_REFERENCE_VALUES).map(val => {
            const name = ACTIVITY_LOG_REFERENCE_VALUES[val];

            return {
                id: +val,
                name,
            };
        });

        return sections;
    }

    function getActions() {
        const actions = Object.keys(ACTIVITY_LOG_ACTION_VALUES).map(val => {
            const name = ACTIVITY_LOG_ACTION_VALUES[val];

            return {
                id: +val,
                name,
            };
        });

        return actions;
    }

    function handleFormChange(name, value) {
        handleChange({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit() {
        const keys = Object.keys(form);
        const postBody = { items: [] };

        keys.forEach(key => {
            const referenceType = key.split('-')[1];
            const actionType = key.split('-')[3];
            const isEnabled = form[key];

            if (isEnabled) {
                postBody.items.push({
                    referenceType: +referenceType,
                    actionType: +actionType,
                });
            }
        });

        postActivityLogSettings(postBody);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        activityLogReducer: { isPosting, success, postError },
    },
}) => ({
    isPosting,
    success,
    error: postError,
});

const mapDispatchToProps = {
    postActivityLogSettings,
    showModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditActivityLogFormContainer),
);
