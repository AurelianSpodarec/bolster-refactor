import React, { useEffect } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
import { connect } from 'react-redux';

import AutoDeleteSettingsModal from '../presentational/AutoDeleteSettingsModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import editReportAutoDeleteSettings from 'actions/companyAdmin/companySettings/async/editReportAutoDeleteSettings';

const AutoDeleteSettingsModalContainer = ({
    hideModal,
    postSuccess,
    isPosting,
    editReportAutoDeleteSettings,
    modalProps: id,
    showModal,
}) => {
    const [formData, handleChange] = useForm({ valueToUpdate: '' });
    const prevProps = usePrevious(postSuccess);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: `Your report auto delete time has successfully been changed to: ${formData.valueToUpdate} days`,
            });
        }
    }, [postSuccess, prevProps.postSuccess]);

    return (
        <AutoDeleteSettingsModal
            form={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            hideModal={hideModal}
            isPosting={isPosting}
        />
    );
    function handleSubmit() {
        const postBody = { valueToUpdate: formData.valueToUpdate, id };
        editReportAutoDeleteSettings(postBody);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        reportAutoDeleteSettingsReducer: { isPosting, error, postSuccess },
    },
    shared: {
        modalReducer: { modalProps },
    },
}) => ({
    isPosting,
    error,
    modalProps,
    postSuccess,
});

const mapDispatchToProps = {
    hideModal,
    editReportAutoDeleteSettings,
    showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoDeleteSettingsModalContainer);
