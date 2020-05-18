import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import toggleManufacturer from 'actions/companyAdmin/manufacturers/async/toggleManufacturer';
import ToggleManufacturerModal from '../presentational/ToggleManufacturerModal';

const ToggleManufacturerModalContainer = ({ manufacturer, hideModal, toggleManufacturer }) => {
    const isEnableRequest = manufacturer.isDisabled;
    return (
        <ToggleManufacturerModal
            toggleManufacturer={() => {
                hideModal();
                toggleManufacturer(manufacturer.id, manufacturer.type, isEnableRequest);
            }}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message={`Are you sure you want to ${
                isEnableRequest ? 'enable' : 'disable'
            } this manufacturer - ${manufacturer.name}?`}
            deleteButtonText={'Confirm'}
            icon="check"
        />
    );
};

const mapDispatchToProps = {
    hideModal,
    toggleManufacturer,
};

export default connect(null, mapDispatchToProps)(ToggleManufacturerModalContainer);
