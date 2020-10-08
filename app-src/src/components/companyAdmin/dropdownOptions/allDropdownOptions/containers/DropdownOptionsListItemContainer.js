import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EDIT_DROPDOWN_OPTION, TOGGLE_DROPDOWN_OPTION } from 'constants/shared/modalTypes';
import DropdownOptionsListItem from '../presentational/DropdownOptionsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import postDropdownOptionsSort from 'actions/companyAdmin/dropdownOptions/async/postDropdownOptionsSort';

class DropdownOptionsListItemContainer extends Component {
    render() {
        const { option, colCount, headers, index, onMobile, moveItem, isSorting } = this.props;
        return (
            <DropdownOptionsListItem
                index={index}
                id={option.id}
                option={option}
                onMove={moveItem}
                onDrop={() => this.handlePostDropdownOptionsSort()}
                colCount={colCount}
                handleEditOptionModal={this.handleEditOptionModal}
                handleToggleEnable={this.handleToggleEnable}
                headers={headers}
                onMobile={onMobile}
                isSorting={isSorting}
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

const mapState = ({
    companyAdmin: {
        dropdownOptionsReducer: { dropdownOptions },
    },
    shared: {
        mobileReducer: { onMobile },
        sortReducer: { isSorting },
    },
}) => ({
    onMobile,
    dropdownOptions: Object.values(dropdownOptions),
    isSorting,
});

const mapDispatch = {
    showModal,
    postDropdownOptionsSort,
};

export default connect(mapState, mapDispatch)(DropdownOptionsListItemContainer);
