import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postActivityLogSettings from 'actions/companyAdmin/activityLog/async/postActivityLogSettings';
import showModal from 'actions/shared/generic/modals/sync/showModal';

import { usePrevious } from 'helpers/hooks';

import EditActivityLogForm from '../presentational/EditActivityLogForm';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import useEditActivitySettings from '../hooks/useEditActivitySettings';

const EditActivityLogFormContainer = ({
    settings,
    postActivityLogSettings,
    showModal,
    isPosting,
    success,
    error,
    history,
}) => {
    const [selectionToSubmit, handleChange, options, checkIsSelected, selectAll, deselectAll] =
        useEditActivitySettings(settings);
    const prevProps = usePrevious({ isPosting });

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
            options={options}
            handleChange={handleChange}
            checkIsSelected={checkIsSelected}
            handleSubmit={handleSubmit}
            isPosting={isPosting}
            selectAll={selectAll}
            deselectAll={deselectAll}
        />
    );

    function handleSubmit() {
        postActivityLogSettings({ items: selectionToSubmit });
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
