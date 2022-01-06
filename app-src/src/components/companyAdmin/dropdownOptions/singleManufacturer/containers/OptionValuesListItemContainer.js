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

        const filteredSubscriptionServices = services.filter(({ id }) =>
            subscriptionServiceIDs.includes(id),
        );

        const selectedServiceNames = filteredSubscriptionServices.reduce((acc, currService) => {
            const { serviceIDs } = optionValue;
            if (serviceIDs === null) {
                return acc;
            } else if (serviceIDs.includes(currService.id)) {
                acc.push(currService.name);
            }
            return acc;
        }, []);

        if (selectedServiceNames.length) {
            return selectedServiceNames.join(', ');
        } else {
            const selectedOptionManufacturer = installationTypes[optionValue.manufacturerID];

            if (selectedOptionManufacturer.serviceIDs?.length) {
                return filteredSubscriptionServices
                    .reduce((acc, currService) => {
                        const { serviceIDs } = selectedOptionManufacturer;
                        if (serviceIDs.includes(currService.id)) acc.push(currService.name);

                        return acc;
                    }, [])
                    .join(', ');
            } else {
                return '[All Services]';
            }
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
