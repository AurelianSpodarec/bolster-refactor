import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADMIN_EDIT_MANUFACTURER, ADMIN_DELETE_MANUFACTURER } from 'constants/shared/modalTypes';

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
                handleDeleteManufacturerModal={this.handleDeleteManufacturerModal}
                headers={headers}
                onMobile={onMobile}
            />
        );
    }
    handleEditManufacturerModal = manufacturer => {
        const { showModal } = this.props;
        showModal(ADMIN_EDIT_MANUFACTURER, { manufacturer });
        // todo edit manufacturer modal and associated redux functions
    };

    handleDeleteManufacturerModal = manufacturer => {
        const { showModal } = this.props;
        showModal(ADMIN_DELETE_MANUFACTURER, { manufacturer });
        // todo edit manufacturer modal and associated redux functions
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
