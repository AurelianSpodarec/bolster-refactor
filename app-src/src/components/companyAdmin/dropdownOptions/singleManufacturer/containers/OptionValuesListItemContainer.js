import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    COMPANY_TOGGLE_MANUFACTURER_OPTION_VALUE,
    COMPANY_EDIT_OPTION_VALUE,
    COMPANY_DELETE_OPTION_VALUE,
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
            index,
            moveItem,
            match: { url },
            isSorting,
        } = this.props;

        const selectedServiceNamesToShow = this.getSelectedServiceName();
        return (
            <OptionValuesListItem
                optionValue={optionValue}
                colCount={colCount}
                handleEditOptionValueModal={this.handleEditOptionValueModal}
                handleDeleteOptionValueModal={this.handleDeleteOptionValueModal}
                handleToggleEnable={this.handleToggleEnable}
                headers={headers}
                onMobile={onMobile}
                selectedServiceNames={selectedServiceNamesToShow}
                index={index}
                onMove={moveItem}
                onDrop={this.handlePostOptionValuesSort}
                url={url}
                isSorting={isSorting}
            />
        );
    }

    handleDeleteOptionValueModal = optionValue => {
        const { showModal } = this.props;
        showModal(COMPANY_DELETE_OPTION_VALUE, { optionValue });
    };

    handleEditOptionValueModal = optionValue => {
        const { showModal, services } = this.props;
        showModal(COMPANY_EDIT_OPTION_VALUE, { optionValue, services });
    };

    handleToggleEnable = () => {
        const { showModal, optionValue } = this.props;
        showModal(COMPANY_TOGGLE_MANUFACTURER_OPTION_VALUE, { optionValue });
    };

    handlePostOptionValuesSort = () => {
        const {
            params: { id: manufacturerID },
            postManufacturerOptionValuesSort,
            optionValues,
        } = this.props;

        postManufacturerOptionValuesSort(manufacturerID, optionValues);
    };

    getSelectedServiceName = () => {
        const { services, optionValue, subscriptionServiceIDs, installationTypes } = this.props;
        const allServices = '[All Services]';

        const companySubscriptionServices = services.filter(({ id }) =>
            subscriptionServiceIDs.includes(id),
        );

        const optionServices = companySubscriptionServices.reduce((acc, currService) => {
            const { serviceIDs } = optionValue;
            if (serviceIDs?.includes(currService.id)) {
                acc.push(currService.name);
            }
            return acc;
        }, []);

        if (optionServices.length) {
            return optionServices.length === subscriptionServiceIDs.length
                ? allServices
                : optionServices.join(', ');
        } else {
            const selectedOptionManufacturer = installationTypes[optionValue.manufacturerID];

            return selectedOptionManufacturer.serviceIDs?.length
                ? companySubscriptionServices
                      .reduce((acc, currService) => {
                          const { serviceIDs } = selectedOptionManufacturer;
                          if (serviceIDs.includes(currService.id)) acc.push(currService.name);

                          return acc;
                      }, [])
                      .join(', ')
                : allServices;
        }
    };
}

const mapState = (
    {
        companyAdmin: {
            subscriptionsReducer: {
                subscriptions: { serviceIDs },
            },
            manufacturersReducer: {
                manufacturers: { installationTypes },
            },
        },
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
    subscriptionServiceIDs: serviceIDs,
    installationTypes,
});
const mapDispatchToProps = {
    showModal,
    postManufacturerOptionValuesSort,
};

export default withRouter(connect(mapState, mapDispatchToProps)(OptionValuesListItemContainer));
