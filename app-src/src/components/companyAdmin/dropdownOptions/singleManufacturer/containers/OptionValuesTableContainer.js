import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { SUCCESS_MODAL, ERROR_MODAL, COMPANY_ADD_OPTION_VALUE } from 'constants/shared/modalTypes';

import OptionValuesTable from '../presentational/OptionValuesTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';
import { DROPDOWN_OPTIONS, DROPDOWN_OPTION_LOOKUP } from 'constants/companyAdmin/enums';

class OptionValuesTableContainer extends Component {
    render() {
        const { isFetching, error, optionValues, title, type, services } = this.props;

        const optionValuesFilteredBySubscription = optionValues.filter(optionValue => {
            return this.shouldOptionValueBeIncluded(optionValue.serviceIDs);
        });

        return (
            <OptionValuesTable
                headers={['Name', 'Services', '']}
                optionValues={optionValuesFilteredBySubscription}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddOptionValueModal={this.handleAddOptionValueModal}
                type={type}
                services={Object.values(services)}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, postError, fieldErrors } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Option values list updated successfully.',
            });
        }
        if (postError && !prevProps.postError && isObjEmpty(fieldErrors)) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    postError.message ||
                    'There was an error processing your request, please try again later.',
            });
        }
    };

    handleAddOptionValueModal = () => {
        const { showModal, manufacturer, services } = this.props;
        showModal(COMPANY_ADD_OPTION_VALUE, { manufacturer, services });
        // todo company admin add option value reducer and modal
    };

    shouldOptionValueBeIncluded = serviceIDs => {
        const { subscriptionServiceIDs } = this.props;
        return serviceIDs.some(id => subscriptionServiceIDs.includes(id));
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersReducer: {
                manufacturers,
                isFetching: isFetchingManufacturers,
                error: manufacturersError,
            },
            manufacturersOptionValuesReducer: {
                manufacturersOptionValues,
                isFetching,
                error,
                postSuccess,
                postError,
            },
            subscriptionsReducer: {
                subscriptions: { serviceIDs: subscriptionServiceIDs },
                isFetching: isFetchingSubscriptions,
                error: subscriptionsError,
            },
            servicesReducer: { services, isFetching: isFetchingServices, error: servicesError },
        },
        shared: {
            fieldErrorsReducer: { fieldErrors },
        },
    },
    {
        match: {
            params: { id, type },
        },
    },
) => {
    const pinOptionKey = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]].reduxKey;

    return {
        manufacturer: manufacturers[pinOptionKey][id],
        manufacturerID: id,
        isFetching:
            isFetching || isFetchingServices || isFetchingManufacturers || isFetchingSubscriptions,
        error: error || servicesError || manufacturersError || subscriptionsError,
        optionValues: manufacturersOptionValues[id]
            ? Object.values(manufacturersOptionValues[id])
            : [],
        services,
        subscriptionServiceIDs,
        fieldErrors,
        postSuccess,
        postError,
    };
};

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OptionValuesTableContainer));
