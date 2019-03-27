import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/generic/modals/sync/showModal';
import EnquiriesListItem from '../presentational/EnquiriesListItem';
import { DELETE_ENQUIRY } from 'constants/modalTypes';

const EnquiriesListItemContainer = ({ enquiry, colCount, showModal }) => {
    return (
        <EnquiriesListItem
            enquiry={enquiry}
            colCount={colCount}
            handleShowModal={handleShowModal}
        />
    );

    function handleShowModal(enquiry) {
        showModal(DELETE_ENQUIRY, { id: enquiry.id });
    }
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EnquiriesListItemContainer);
