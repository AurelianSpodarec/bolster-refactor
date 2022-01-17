import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editOptionValue from 'actions/companyAdmin/manufacturers/async/editOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import EditOptionValueForm from '../presentational/EditOptionValueForm';

class EditOptionValueFormContainer extends Component {
    state = {
        name: this.props.optionValue.name,
        serviceIDs: this.props.optionValue.serviceIDs || [],
    };

    render() {
        return (
            <EditOptionValueForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
                serviceOptions={this.getServicesFromSubscriptions()}
            />
        );
    }

    componentDidMount = () => {
        const subscribedServiceIDs = this.getServicesFromSubscriptions();

        this.setState({ serviceIDs: [...subscribedServiceIDs] });
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const { optionValues, optionValue: optionValueBeingEdited } = this.props;

        const nameTaken = optionValues.some(
            optionValue =>
                optionValue.name === value && optionValue.id !== optionValueBeingEdited.id,
        );
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editOptionValue, optionValue } = this.props;
        const { name, serviceIDs } = this.state;

        const postBody = {
            name,
            serviceIDs,
            id: optionValue.id,
        };
        editOptionValue(optionValue.manufacturerID, postBody);
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
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersOptionValuesReducer: { manufacturersOptionValues },
            servicesReducer: { services },
            subscriptionsReducer: { subscriptions },
        },
    },
    { optionValue },
) => {
    return {
        optionValues: manufacturersOptionValues[optionValue.manufacturerID]
            ? Object.values(manufacturersOptionValues[optionValue.manufacturerID])
            : [],
        services,
        subscriptions,
    };
};

const mapDispatchToProps = {
    editOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditOptionValueFormContainer),
);
