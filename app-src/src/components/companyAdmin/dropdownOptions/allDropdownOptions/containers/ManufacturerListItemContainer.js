import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADMIN_EDIT_MANUFACTURER } from 'constants/shared/modalTypes';

import ManufacturerListItem from '../presentational/ManufacturerListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class ManufacturerListItemContainer extends Component {
    render() {
        const { manufacturer, colCount, headers, onMobile } = this.props;
        return (
            <ManufacturerListItem
                manufacturer={manufacturer}
                colCount={colCount}
                handleEditManufacturerModal={this.handleEditManufacturerModal}
                headers={headers}
                onMobile={onMobile}
                handleToggleEnable={this.handleToggleEnable}
            />
        );
    }
    handleEditManufacturerModal = manufacturer => {
        // const { showModal } = this.props;
        // showModal(ADMIN_EDIT_MANUFACTURER, { manufacturer });
        // todo company admin edit manufacturer modal and associated redux functions
    };

    handleToggleEnable = () => {
        // const { showModal, manufacturer } = this.props;
        // showModal(TOGGLE_MANUFACTURER, { manufacturer });
        // todo company admin enable and disable manufacturers
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    ({
        shared: {
            mobileReducer: { onMobile },
        },
    }) => ({
        onMobile,
    }),
    mapDispatchToProps,
)(ManufacturerListItemContainer);
