import React, { Component } from 'react';
import { connect } from 'react-redux';

import reorderDropdownOptions from 'actions/companyAdmin/dropdownOptions/sync/reorderDropdownOptions';
import { ADD_DROPDOWN_OPTION, SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import DropdownOptionsTable from '../presentational/DropdownOptionsTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isObjEmpty } from 'helpers/generic';

class DropdownListTableContainer extends Component {
    state = {
        serviceFilterOptions: {},
        selectedService: '',
    };
    render() {
        const { serviceFilterOptions, selectedService } = this.state;
        const { isFetching, error, title, type, isSorting, dropdownOptions } = this.props;

        return (
            <DropdownOptionsTable
                headers={['Name', '']}
                dropdownOptions={this.filterDropdownOptions(dropdownOptions)}
                isFetching={isFetching}
                error={error}
                title={title}
                handleAddOptionModal={this.handleAddOptionModal}
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
                message: 'Dropdown options updated successfully',
            });
        }
        if (postError && !prevProps.postError && isObjEmpty(fieldErrors)) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    postError.message ||
                    '##There was an error processing your request, please try again later.##',
            });
        }
    };

    handleChange = (_, value) => {
        this.setState({ selectedService: value });
    };

    handleAddOptionModal = () => {
        const { showModal, type } = this.props;
        showModal(ADD_DROPDOWN_OPTION, { type });
    };

    moveItem = (overindex, fromIndex) => {
        const { reorderDropdownOptions, dropdownOptions } = this.props;

        const items = [...dropdownOptions].sort((a, b) => a.sort - b.sort);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));
        reorderDropdownOptions(sorted);
    };

    filterDropdownOptions = dropdownOptions => {
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

const mapStateToProps = ({
    companyAdmin: {
        dropdownOptionsReducer: { dropdownOptions, isFetching, error, postSuccess, postError },
        subscriptionsReducer: {
            subscriptions: { serviceIDs },
        },
        servicesReducer: { services, isFetchingServices },
    },
    shared: {
        fieldErrorsReducer: { fieldErrors },
        sortReducer: { isSorting },
    },
}) => ({
    postError,
    postSuccess,
    isFetching: isFetchingServices || isFetching,
    error,
    dropdownOptions: Object.values(dropdownOptions).sort((a, b) => a.sort - b.sort),
    fieldErrors,
    isSorting,
    subscribedServices: Object.values(services).filter(service => serviceIDs.includes(service.id)),
});

const mapDispatchToProps = {
    showModal,
    reorderDropdownOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownListTableContainer);
