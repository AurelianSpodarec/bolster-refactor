import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import toggleManufacturerOptionValue from 'actions/companyAdmin/manufacturers/async/toggleManufacturerOptionValue';
import ToggleManufacturerOptionValue from '../presentational/ToggleManufacturerOptionValueModal';

const ToggleManufacturerOptionValueContainer = ({
    optionValue,
    toggleManufacturerOptionValue,
    hideModal,
}) => {
    const isEnableRequest = optionValue.isDisabled;

    return (
        <ToggleManufacturerOptionValue
            toggleManufacturerOptionValue={() => {
                hideModal();
                toggleManufacturerOptionValue(optionValue.id, optionValue.type, isEnableRequest);
            }}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message={`Are you sure you want to ${
                isEnableRequest ? 'enable' : 'disable'
            } this option value - ${optionValue.name}?`}
            deleteButtonText={'Confirm'}
            icon="check"
        />
    );
};

const mapDispatchToProps = {
    hideModal,
    toggleManufacturerOptionValue,
};

export default connect(null, mapDispatchToProps)(ToggleManufacturerOptionValueContainer);
