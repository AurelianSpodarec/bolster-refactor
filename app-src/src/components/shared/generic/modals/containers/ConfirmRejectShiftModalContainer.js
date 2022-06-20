import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmRejectShiftModal from '../presentational/ConfirmRejectShiftModal';
import postRejectShift from 'actions/companyAdmin/timesheets/async/postRejectShift';

const ConfirmRejectShiftModalContainer = ({ shiftID, title, message, handleReject, hideModal }) => (
    <ConfirmRejectShiftModal
        handleReject={() => handleReject(shiftID)}
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
    handleReject: shiftID => {
        dispatch(postRejectShift(shiftID));
        dispatch(hideModal());
    },
});

export default connect(null, mapDispatchToProps)(ConfirmRejectShiftModalContainer);
