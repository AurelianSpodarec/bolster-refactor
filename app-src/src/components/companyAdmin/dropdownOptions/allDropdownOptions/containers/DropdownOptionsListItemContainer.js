import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EDIT_DROPDOWN_OPTION, TOGGLE_DROPDOWN_OPTION } from 'constants/shared/modalTypes';
import DropdownOptionsListItem from '../presentational/DropdownOptionsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import reorderDropdownOptions from 'actions/companyAdmin/dropdownOptions/sync/reorderDropdownOptions';

class DropdownOptionsListItemContainer extends Component {
    render() {
        const { option, colCount, headers, index, reorderDropdownOptions, onMobile } = this.props;
        return (
            <DropdownOptionsListItem
                index={index}
                id={option.id}
                option={option}
                onMove={reorderDropdownOptions}
                onDrop={() => console.log('dropped')}
                colCount={colCount}
                handleEditOptionModal={this.handleEditOptionModal}
                handleToggleEnable={this.handleToggleEnable}
                headers={headers}
                onMobile={onMobile}
            />
        );
    }
    handleEditOptionModal = option => {
        const { showModal } = this.props;
        showModal(EDIT_DROPDOWN_OPTION, { option });
    };

    handleToggleEnable = () => {
        const { showModal, option } = this.props;
        showModal(TOGGLE_DROPDOWN_OPTION, { option });
    };
}

const mapDispatchToProps = {
    showModal,
    reorderDropdownOptions,
};

export default connect(
    ({
        shared: {
            mobileReducer: { onMobile },
        },
    }) => ({
        onMobile,
    }),
    mapDispatchToProps,
)(DropdownOptionsListItemContainer);
