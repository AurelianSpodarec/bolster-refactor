import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    EDIT_DROPDOWN_OPTION,
    DELETE_DROPDOWN_OPTION
} from 'constants/shared/modalTypes';
import DropdownOptionsListItem from '../presentational/DropdownOptionsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class DropdownOptionsListItemContainer extends Component {
    render() {
        const { option, colCount } = this.props;
        return (
            <DropdownOptionsListItem
                option={option}
                colCount={colCount}
                handleEditOptionModal={this.handleEditOptionModal}
                handleDeleteOptionModal={this.handleDeleteOptionModal}
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
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    null,
    mapDispatchToProps
)(DropdownOptionsListItemContainer);
