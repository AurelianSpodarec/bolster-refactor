import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteManufacturer from 'actions/companyAdmin/manufacturers/async/deleteManufacturer';
import DeleteManufacturerModal from '../presentational/DeleteManufacturerModal';

const DeleteManufacturerModalContainer = ({ manufacturer, hideModal, deleteManufacturer }) => {
    const handleDelete = () => {
        deleteManufacturer(manufacturer);
        hideModal();
    };

    return (
        <DeleteManufacturerModal
            deleteManufacturer={handleDelete}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            deleteButtonText={'Confirm'}
            icon="check"
            manufacturer={manufacturer}
        />
    );
};

const mapDispatchToProps = {
    hideModal,
    deleteManufacturer,
};

export default connect(null, mapDispatchToProps)(DeleteManufacturerModalContainer);
