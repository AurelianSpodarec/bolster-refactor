import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    COMPANY_TOGGLE_MANUFACTURER_OPTION_VALUE,
    COMPANY_EDIT_OPTION_VALUE,
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import OptionValuesListItem from '../presentational/OptionValuesListItem';
import { withRouter } from 'react-router-dom';
import postManufacturerOptionValuesSort from 'actions/companyAdmin/dropdownOptions/async/postManufacturerOptionValuesSort';

class OptionValuesListItemContainer extends Component {
    render() {
        const {
            optionValue,
            colCount,
            headers,
            onMobile,
            services,
            index,
            moveItem,
            match: { url },
            isSorting,
        } = this.props;
        const selectedServiceNames = services
            .reduce((acc, currService) => {
                if (optionValue.serviceIDs.includes(currService.id)) {
                    acc.push(currService.name);
                }
                return acc;
            }, [])
            .join(', ');

        return (
            <OptionValuesListItem
                optionValue={optionValue}
                colCount={colCount}
                handleEditOptionValueModal={this.handleEditOptionValueModal}
                handleToggleEnable={this.handleToggleEnable}
                headers={headers}
                onMobile={onMobile}
                selectedServiceNames={selectedServiceNames}
                index={index}
                onMove={moveItem}
                onDrop={this.handlePostOptionValuesSort}
                url={url}
                isSorting={isSorting}
            />
        );
    }
    handleEditOptionValueModal = optionValue => {
        const { showModal, services } = this.props;
        showModal(COMPANY_EDIT_OPTION_VALUE, { optionValue, services });
        // todo company admin edit option value redux and modal
    };

    handleToggleEnable = () => {
        const { showModal, optionValue } = this.props;
        showModal(COMPANY_TOGGLE_MANUFACTURER_OPTION_VALUE, { optionValue });
        // todo company admin toggle enable disable option value redux and modal
    };

    handlePostOptionValuesSort = () => {
        const {
            params: { id: manufacturerID },
            postManufacturerOptionValuesSort,
            optionValues,
        } = this.props;

        postManufacturerOptionValuesSort(manufacturerID, optionValues);
    };
}

const mapState = (
    {
        shared: {
            mobileReducer: { onMobile },
            sortReducer: { isSorting },
        },
    },
    { match: { params } },
) => ({
    onMobile,
    params,
    isSorting,
});
const mapDispatchToProps = {
    showModal,
    postManufacturerOptionValuesSort,
};

export default withRouter(connect(mapState, mapDispatchToProps)(OptionValuesListItemContainer));
