import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/generic/modals/sync/showModal';
import EnquiriesListItem from '../presentational/EnquiriesListItem';
import { DELETE_ITEM } from 'constants/modalTypes';
import { deleteEnquiry } from 'actions/enquiries/async/deleteEnquiry';

const EnquiriesListItemContainer = ({
    enquiry,
    colCount,
    showModal,
    deleteItem
}) => {
    return (
        <EnquiriesListItem
            enquiry={enquiry}
            colCount={colCount}
            handleShowModal={handleShowModal}
        />
    );

    function handleShowModal(enquiry) {
        showModal(DELETE_ITEM, { id: enquiry.id, deleteItem });
    }
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    },
    deleteItem: id => {
        dispatch(deleteEnquiry(id));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EnquiriesListItemContainer);
