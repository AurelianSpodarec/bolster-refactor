import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EDIT_DROPDOWN_OPTION, TOGGLE_DROPDOWN_OPTION } from 'constants/shared/modalTypes';
import DropdownOptionsListItem from '../presentational/DropdownOptionsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import reorderDropdownOptions from 'actions/companyAdmin/dropdownOptions/sync/reorderDropdownOptions';
import postDropdownOptionsSort from 'actions/companyAdmin/dropdownOptions/async/postDropdownOptionsSort';

class DropdownOptionsListItemContainer extends Component {
    render() {
        const {
            option,
            colCount,
            headers,
            index,
            reorderDropdownOptions,
            isCustomSort,
            onMobile,
        } = this.props;
        return (
            <DropdownOptionsListItem
                index={index}
                id={option.id}
                option={option}
                onMove={reorderDropdownOptions}
                onDrop={() => this.handlePostDropdownOptionsSort()}
                colCount={colCount}
                handleEditOptionModal={this.handleEditOptionModal}
                handleToggleEnable={this.handleToggleEnable}
                headers={headers}
                onMobile={onMobile}
                isCustomSort={isCustomSort}
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

    handlePostDropdownOptionsSort = () => {
        const { type, dropdownOptions, postDropdownOptionsSort } = this.props;

        postDropdownOptionsSort(type, dropdownOptions);
    };
}

const mapDispatchToProps = {
    showModal,
    reorderDropdownOptions,
    postDropdownOptionsSort,
};

export default connect(
    ({
        companyAdmin: {
            dropdownOptionsReducer: { dropdownOptions },
        },
        shared: {
            mobileReducer: { onMobile },
        },
    }) => ({
        onMobile,
        dropdownOptions: Object.values(dropdownOptions),
    }),
    mapDispatchToProps,
)(DropdownOptionsListItemContainer);
