import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import deleteBugReport from 'actions/superAdmin/bugReports/deleteBugReport';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';

const useDeleteBugReport = () => {
    const dispatch = useDispatch();

    const handleDeleteBugReport = useCallback(id => {
        const handleSubmit = () => {
            dispatch(deleteBugReport(id));
            hideModal();
        };

        const message = 'Are you sure you want to delete this bug report?';
        dispatch(showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal }));
    }, []);

    return [handleDeleteBugReport];
};

export default useDeleteBugReport;
