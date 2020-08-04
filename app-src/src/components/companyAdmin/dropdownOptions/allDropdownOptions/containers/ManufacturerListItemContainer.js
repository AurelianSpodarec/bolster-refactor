import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    COMPANY_EDIT_MANUFACTURER,
    COMPANY_TOGGLE_MANUFACTURER,
} from 'constants/shared/modalTypes';

import ManufacturerListItem from '../presentational/ManufacturerListItem';
import postManufacturersSort from 'actions/companyAdmin/dropdownOptions/async/postManufacturersSort';
import { withRouter } from 'react-router-dom';

class ManufacturerListItemContainer extends Component {
    render() {
        const {
            manufacturer,
            colCount,
            headers,
            onMobile,
            isCustomSort,
            moveItem,
            url,
            index,
        } = this.props;
        return (
            <ManufacturerListItem
                manufacturer={manufacturer}
                colCount={colCount}
                handleEditManufacturerModal={this.handleEditManufacturerModal}
                onMove={moveItem}
                onDrop={() => this.handlePostManufacturerSort()}
                headers={headers}
                onMobile={onMobile}
                handleToggleEnable={this.handleToggleEnable}
                isCustomSort={isCustomSort}
                url={url}
                index={index}
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
    };

    handlePostManufacturerSort = () => {
        const { type, manufacturers, postManufacturersSort } = this.props;
        postManufacturersSort(type, manufacturers);
    };
}
const mapStateToProps = (
    {
        shared: {
            mobileReducer: { onMobile },
        },
    },
    { match: { url } },
) => ({
    onMobile,
    url,
});
const mapDispatchToProps = { showModal, postManufacturersSort };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ManufacturerListItemContainer),
);
