import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createManufacturer from 'actions/companyAdmin/manufacturers/async/createManufacturer';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddManufacturerForm from '../presentational/AddManufacturerForm';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import { showOAndMTsAndCsModal } from 'actions/shared/generic/modals/sync/showOAndMTsAndCsModal';

class AddManufacturerFormContainer extends Component {
    state = {
        name: '',
        serviceIDs: [],
    };

    render() {
        return (
            <AddManufacturerForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
                subscribedServices={this.getServicesFromSubscriptions()}
            />
        );
    }

    componentDidMount() {
        const subscribedServiceIDs = this.getServicesFromSubscriptions().map(({ value }) => value);

        this.setState({ serviceIDs: subscribedServiceIDs });

        this.props.showOAndMTsAndCsModal('add manufacturer');
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const { manufacturers } = this.props;
        const nameTaken = manufacturers.some(manufacturer => manufacturer.name === value);
        if (nameTaken) return 'Please choose a unique name.';
    };

    getServicesFromSubscriptions = () => {
        const { services, subscriptions } = this.props;
        const subscribedServices = subscriptions.services.map(({ serviceID }) => {
            return {
                text: services[serviceID].name,
                name: services[serviceID].name,
                value: serviceID.toString(),
            };
        });
        return subscribedServices;
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createManufacturer, type } = this.props;

        const postBody = {
            ...this.state,
            pinOptionType: type,
        };

        createManufacturer(type, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersReducer: { manufacturers },
            subscriptionsReducer: { subscriptions },
            servicesReducer: { services },
        },
    },
    { type },
) => {
    const pinOptionType = DROPDOWN_OPTIONS[type].reduxKey;
    return {
        manufacturers: manufacturers[pinOptionType]
            ? Object.values(manufacturers[pinOptionType])
            : [],
        subscriptions,
        services,
    };
};

const mapDispatchToProps = {
    createManufacturer,
    hideModal,
    showOAndMTsAndCsModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddManufacturerFormContainer),
);
