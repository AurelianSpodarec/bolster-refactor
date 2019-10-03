import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EDIT_DROPDOWN_OPTION, DELETE_DROPDOWN_OPTION } from 'constants/shared/modalTypes';
import DropdownOptionsListItem from '../presentational/DropdownOptionsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import enableDropdownOption from 'actions/companyAdmin/dropdownOptions/async/enableDropdownOption';

class DropdownOptionsListItemContainer extends Component {
    render() {
        const { option, colCount, headers, onMobile } = this.props;
        return (
            <DropdownOptionsListItem
                option={option}
                colCount={colCount}
                handleEditOptionModal={this.handleEditOptionModal}
                handleDeleteOptionModal={this.handleDeleteOptionModal}
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

    handleDeleteOptionModal = option => {
        const { showModal } = this.props;
        showModal(DELETE_DROPDOWN_OPTION, { option });
    };

    handleToggleEnable = () => {
        const { enableDropdownOption, option } = this.props;
        //post enable/disable

        if (option.isDisabled) {
            enableDropdownOption(option.id, option.type);
        }
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    enableDropdownOption: (id, type) => dispatch(enableDropdownOption(id, type))
});

export default connect(
    ({
        shared: {
            mobileReducer: { onMobile }
        }
    }) => ({
        onMobile
    }),
    mapDispatchToProps
)(DropdownOptionsListItemContainer);
