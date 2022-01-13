import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editDropdownOption from 'actions/companyAdmin/dropdownOptions/async/editDropdownOption';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import EditDropdownOptionForm from '../presentational/EditDropdownOptionForm';

class EditDropdownOptionContainer extends Component {
    state = {
        name: '',
        serviceIDs: [],
    };

    render() {
        return (
            <EditDropdownOptionForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                validateName={this.validateName}
                subscribedServices={this.getServicesFromSubscriptions()}
            />
        );
    }

    componentDidMount = () => {
        const {
            option: { name, serviceIDs },
        } = this.props;
        const subscribedServiceIDs = this.getServicesFromSubscriptions().map(({ id }) => id);
        console.log(serviceIDs);
        this.setState({
            name: name,
            serviceIDs: serviceIDs !== null ? serviceIDs : [...subscribedServiceIDs],
        });
    };

    componentDidUpdate = prevProps => {
        const {
            option: { name, id },
        } = this.props;

        if (!prevProps.option.id && !!id) {
            this.setState({
                name,
            });
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const {
            dropdownOptions,
            option: { id },
        } = this.props;

        const existingNames = dropdownOptions.filter(op => op.id !== id).map(({ name }) => name);

        if (existingNames.includes(value)) return 'Please choose a unique name.';
    };

    getServicesFromSubscriptions = () => {
        const { services, subscriptions } = this.props;
        const subscribedServices = subscriptions.services.map(
            ({ serviceID }) => services[serviceID],
        );
        return subscribedServices;
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            editDropdownOption,
            option: { id, type },
        } = this.props;
        const { serviceIDs } = this.state;

        const postBody = {
            ...this.state,
            serviceIDs: serviceIDs.length ? serviceIDs : null,
        };

        editDropdownOption(id, type, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            dropdownOptionsReducer: { dropdownOptions },
            servicesReducer: { services },
            subscriptionsReducer: { subscriptions },
        },
    },
    { option: { type } },
) => ({
    dropdownOptions: Object.values(dropdownOptions).filter(op => op.type === type),
    services,
    subscriptions,
});

const mapDispatchToProps = dispatch => ({
    editDropdownOption: (id, type, postBody) => {
        dispatch(editDropdownOption(id, type, postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    },
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditDropdownOptionContainer),
);
