import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import disableManufacturer from 'actions/companyAdmin/manufacturers/async/disableManufacturer';
import DeleteManufacturerModal from '../presentational/DeleteManufacturerModal';

const DeleteManufacturerModalContainer = ({ manufacturer, hideModal, disableManufacturer }) => {
    const handleDisable = () => {
        disableManufacturer(manufacturer);
        hideModal();
    };

    return (
        <DeleteManufacturerModal
            disableManufacturer={handleDisable}
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
    disableManufacturer,
};

export default connect(null, mapDispatchToProps)(DeleteManufacturerModalContainer);
