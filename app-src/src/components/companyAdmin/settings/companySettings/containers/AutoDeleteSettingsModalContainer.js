import React, { useEffect } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
import { connect } from 'react-redux';

import AutoDeleteSettingsModal from '../presentational/AutoDeleteSettingsModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editReportAutoDeleteSettings from 'actions/companyAdmin/companySettings/async/editReportAutoDeleteSettings';

const AutoDeleteSettingsModalContainer = ({
    hideModal,
    postSuccess,
    isPosting,
    editReportAutoDeleteSettings,
    modalProps: id,
}) => {
    const [formData, handleChange] = useForm({ valueToUpdate: '' });
    const prevProps = usePrevious(postSuccess);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            hideModal();
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoDeleteSettingsModalContainer);
