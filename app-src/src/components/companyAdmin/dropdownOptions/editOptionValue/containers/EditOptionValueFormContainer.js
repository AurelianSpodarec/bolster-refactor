import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editOptionValue from 'actions/companyAdmin/manufacturers/async/editOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import EditOptionValueForm from '../presentational/EditOptionValueForm';

class EditOptionValueFormContainer extends Component {
    state = {
        name: this.props.optionValue.name,
        serviceIDs: this.props.optionValue.serviceIDs,
        serviceOptions: [],
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
            />
        );
    }

    componentDidMount = () => {
        const serviceOptions = this.formatServicesWithSubscriptions();
        this.setState({ serviceOptions });
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

    formatServicesWithSubscriptions = () => {
        const { subscriptionServiceIDs, services } = this.props;

        return services.reduce((acc, { id, name }) => {
            if (subscriptionServiceIDs.includes(id)) {
                acc.push({
                    value: id,
                    label: name,
                });
            }
            return acc;
        }, []);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersOptionValuesReducer: { manufacturersOptionValues },
            subscriptionsReducer: {
                subscriptions: { serviceIDs: subscriptionServiceIDs },
            },
        },
    },
    { optionValue },
) => {
    return {
        optionValues: manufacturersOptionValues[optionValue.manufacturerID]
            ? Object.values(manufacturersOptionValues[optionValue.manufacturerID])
            : [],
        subscriptionServiceIDs,
    };
};

const mapDispatchToProps = {
    editOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditOptionValueFormContainer),
);
