import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EDIT_DROPDOWN_OPTION, TOGGLE_DROPDOWN_OPTION } from 'constants/shared/modalTypes';
import DropdownOptionsListItem from '../presentational/DropdownOptionsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class DropdownOptionsListItemContainer extends Component {
    render() {
        const { option, colCount, headers, onMobile } = this.props;
        return (
            <DropdownOptionsListItem
                option={option}
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

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
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
