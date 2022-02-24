import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    COMPANY_DELETE_MANUFACTURER,
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
            moveItem,
            url,
            index,
            isSorting,
        } = this.props;
        return (
            <ManufacturerListItem
                manufacturer={manufacturer}
                colCount={colCount}
                handleDeleteManufacturerModal={this.handleDeleteManufacturerModal}
                handleEditManufacturerModal={this.handleEditManufacturerModal}
                onMove={moveItem}
                onDrop={() => this.handlePostManufacturerSort()}
                headers={headers}
                onMobile={onMobile}
                handleToggleEnable={this.handleToggleEnable}
                url={url}
                index={index}
                isSorting={isSorting}
            />
        );
    }

    handleDeleteManufacturerModal = manufacturer => {
        const { showModal } = this.props;
        showModal(COMPANY_DELETE_MANUFACTURER, { manufacturer });
    };

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
            sortReducer: { isSorting },
        },
    },
    { match: { url } },
) => ({
    onMobile,
    url,
    isSorting,
});
const mapDispatchToProps = { showModal, postManufacturersSort };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ManufacturerListItemContainer),
);
