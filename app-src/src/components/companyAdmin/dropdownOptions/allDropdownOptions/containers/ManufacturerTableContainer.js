import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS_MODAL, ERROR_MODAL, COMPANY_ADD_MANUFACTURER } from 'constants/shared/modalTypes';

import ManufacturerTable from '../presentational/ManufacturerTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import reorderManufacturers from 'actions/companyAdmin/dropdownOptions/sync/reorderManufacturers';

class ManufacturerTableContainer extends Component {
    state = {
        serviceFilterOptions: {},
        selectedService: '',
    };

    render() {
        const { serviceFilterOptions, selectedService } = this.state;

        const { isFetching, error, title, type, isSorting, manufacturers } = this.props;

        return (
            <ManufacturerTable
                headers={['Name', '']}
                manufacturers={this.filterManufacturers(manufacturers)}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddManufacturerModal={this.handleAddManufacturerModal}
                type={type}
                moveItem={this.moveItem}
                isSorting={isSorting}
                serviceFilterOptions={Object.values(serviceFilterOptions)}
                selectedService={serviceFilterOptions[selectedService]}
                handleChange={this.handleChange}
            />
        );
    }

    componentDidMount = () => {
        const { subscribedServices } = this.props;

        const serviceFilterOptions = subscribedServices.reduce((acc, { id, name }) => {
            return { ...acc, [id]: { value: id, text: name } };
        }, {});

        this.setState({ serviceFilterOptions });
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, postError, fieldErrors } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Manufacturers list updated successfully.',
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

    handleAddManufacturerModal = () => {
        const { showModal, type } = this.props;
        showModal(COMPANY_ADD_MANUFACTURER, { type });
    };

    handleChange = (_, value) => {
        this.setState({ selectedService: value });
    };

    moveItem = (overindex, fromIndex) => {
        const { manufacturers, reorderManufacturers, type } = this.props;
        const items = [...manufacturers].sort((a, b) => a.sort - b.sort);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1, manufacturerID: x.ID }));
        reorderManufacturers(sorted, type);
    };

    filterManufacturers = dropdownOptions => {
        const { selectedService } = this.state;

        return dropdownOptions.filter(({ serviceIDs }) =>
            selectedService
                ? serviceIDs === null
                    ? true
                    : serviceIDs.includes(+selectedService)
                : true,
        );
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersReducer: { manufacturers, isFetching, error, postSuccess, postError },
            subscriptionsReducer: {
                subscriptions: { serviceIDs },
            },
            servicesReducer: { services, isFetchingServices },
        },
        shared: {
            fieldErrorsReducer: { fieldErrors },
            sortReducer: { isSorting },
        },
    },
    ownProps,
) => {
    const pinOptionKey = DROPDOWN_OPTIONS[ownProps.type].reduxKey;
    return {
        postError,
        postSuccess,
        isFetching: isFetchingServices || isFetching,
        error,
        manufacturers: manufacturers[pinOptionKey]
            ? Object.values(manufacturers[pinOptionKey]).sort((a, b) => a.sort - b.sort)
            : [],
        fieldErrors,
        isSorting,
        subscribedServices: Object.values(services).filter(service =>
            serviceIDs.includes(service.id),
        ),
    };
};

const mapDispatchToProps = { showModal, reorderManufacturers };

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerTableContainer);
