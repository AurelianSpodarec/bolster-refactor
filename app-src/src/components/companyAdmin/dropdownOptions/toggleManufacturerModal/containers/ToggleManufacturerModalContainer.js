import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
// import toggleDropdownOption from 'actions/companyAdmin/dropdownOptions/async/toggleDropdownOption';
import ToggleManufacturerModal from '../presentational/ToggleManufacturerModal';

// const ToggleManufacturerModalContainer = ({ option, toggleManufacturer, hideModal }) => {
const ToggleManufacturerModalContainer = ({ option, hideModal }) => {
    const isEnableRequest = option.isDisabled;
    return (
        <ToggleManufacturerModal
            toggleManufacturer={() => {
                hideModal();
                // toggleManufacturer(option.id, option.type, isEnableRequest);
            }}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message={`Are you sure you want to ${
                option.isDisabled ? 'enable' : 'disable'
            } this dropdown option - ${option.name}?`}
            deleteButtonText={'Confirm'}
            icon="check"
        />
    );
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    // toggleManufacturer: (id, type, isEnableRequest) => {
    //     dispatch(toggleManufacturer(id, type, isEnableRequest));
    // },
});

export default connect(null, mapDispatchToProps)(ToggleManufacturerModalContainer);
