import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmApproveShiftModal from '../presentational/ConfirmApproveShiftModal';
import postApproveShift from 'actions/companyAdmin/timesheets/async/postApproveShift';

const ConfirmApproveShiftModalContainer = ({
    shiftID,
    title,
    message,
    handleApprove,
    hideModal,
}) => (
    <ConfirmApproveShiftModal
        handleApprove={() => handleApprove(shiftID)}
        hideModal={e => {
            e.preventDefault();
            hideModal();
        }}
        title={title}
        message={message}
    />
);

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleApprove: shiftID => {
        dispatch(postApproveShift(shiftID));
        dispatch(hideModal());
    },
});

export default connect(null, mapDispatchToProps)(ConfirmApproveShiftModalContainer);
