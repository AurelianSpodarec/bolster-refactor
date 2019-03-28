import React from 'react';
import ServiceListItem from '../presentational/ServiceListItem';
import { showModal } from 'actions/generic/modals/sync/showModal';
import { connect } from 'react-redux';
import { EDIT_SERVICE } from 'constants/modalTypes';

const ServiceListItemContainer = ({ service, colCount, showModal }) => (
    <ServiceListItem
        service={service}
        colCount={colCount}
        handleShowModal={() => showModal(EDIT_SERVICE, service)}
    />
);

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ServiceListItemContainer);
