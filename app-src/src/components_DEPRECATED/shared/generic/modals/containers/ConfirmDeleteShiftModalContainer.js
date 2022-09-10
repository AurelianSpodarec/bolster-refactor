import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmDeleteShiftModal from '../presentational/ConfirmDeleteShiftModal';
import deleteShift from 'actions/companyAdmin/timesheets/async/deleteShift';

const ConfirmDeleteShiftModalContainer = ({ shiftID, title, message, handleDelete, hideModal }) => (
    <ConfirmDeleteShiftModal
        handleDelete={() => handleDelete(shiftID)}
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
    handleDelete: shiftID => {
        dispatch(deleteShift(shiftID));
        dispatch(hideModal());
    },
});

export default connect(null, mapDispatchToProps)(ConfirmDeleteShiftModalContainer);
