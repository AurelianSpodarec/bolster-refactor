import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import deleteManufacturer from 'actions/superAdmin/manufacturers/async/deleteManufacturer';
import DeleteManufacturerModal from '../presentational/DeleteManufacturerModal';

const DeleteManufacturerModalContainer = ({ manufacturer, hideModal, deleteManufacturer }) => {
    const handleDisable = () => {
        deleteManufacturer(manufacturer);
        hideModal();
    };

    return (
        <DeleteManufacturerModal
            deleteManufacturer={handleDisable}
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
