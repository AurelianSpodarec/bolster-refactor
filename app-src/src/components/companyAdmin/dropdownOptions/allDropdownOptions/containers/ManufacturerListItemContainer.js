import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    COMPANY_EDIT_MANUFACTURER,
    COMPANY_TOGGLE_MANUFACTURER,
} from 'constants/shared/modalTypes';

import ManufacturerListItem from '../presentational/ManufacturerListItem';

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
        const { showModal } = this.props;
        showModal(COMPANY_EDIT_MANUFACTURER, { manufacturer });
    };

    handleToggleEnable = () => {
        const { showModal, manufacturer } = this.props;
        showModal(COMPANY_TOGGLE_MANUFACTURER, { manufacturer });
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
