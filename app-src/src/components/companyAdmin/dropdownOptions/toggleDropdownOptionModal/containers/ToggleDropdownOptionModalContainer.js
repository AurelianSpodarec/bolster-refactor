import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import toggleDropdownOption from 'actions/companyAdmin/dropdownOptions/async/toggleDropdownOption';
import ToggleDropdownOptionModal from '../presentational/ToggleDropdownOptionModal';

const ToggleDropdownOptionModalContainer = ({ option, toggleDropdownOption, hideModal }) => {
    const isEnableRequest = option.isDisabled;
    return (
        <ToggleDropdownOptionModal
            toggleDropdownOption={() => {
                hideModal();
                toggleDropdownOption(option.id, option.type, isEnableRequest);
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
    toggleDropdownOption: (id, type, isEnableRequest) => {
        dispatch(toggleDropdownOption(id, type, isEnableRequest));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ToggleDropdownOptionModalContainer);
