import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createOptionValue from 'actions/companyAdmin/manufacturers/async/createOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddOptionValueForm from '../presentational/AddOptionValueForm';

class AddOptionValueFormContainer extends Component {
    state = {
        name: '',
        serviceIDs: [],
        serviceOptions: [],
        confirmNoDocument: false,
        fileS3Key: '',
        showConfirmNoDocument: false,
    };

    render() {
        const { filesUploading } = this.props;

        return (
            <AddOptionValueForm
                {...this.state}
                handleShowAddDocForm={this.handleShowAddDocForm}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
                filesUploading={filesUploading}
            />
        );
    }

    componentDidMount = () => {
        const serviceOptions = this.formatServicesWithSubscriptions();

        this.setState({ serviceOptions });
    };
    handleShowAddDocForm = () => {
        const { confirmNoDocument } = this.state;

        this.setState({ confirmNoDocument: !confirmNoDocument });
    };
    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const { optionValues } = this.props;
        const nameTaken = optionValues.some(optionValue => optionValue.name === value);
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createOptionValue, manufacturer, filesUploading } = this.props;
        const {
            name,
            serviceIDs,
            fileS3Key,
            confirmNoDocument,
            showConfirmNoDocument,
        } = this.state;

        let postBody = {};

        if (!filesUploading) {
            if (!fileS3Key.length && !confirmNoDocument && !showConfirmNoDocument) {
                this.setState({ showConfirmNoDocument: true });
                return false;
            } else if (fileS3Key.length && !confirmNoDocument && showConfirmNoDocument) {
                this.setState({ showConfirmNoDocument: false });
            }

            if (fileS3Key.length && !confirmNoDocument) {
                postBody = {
                    name,
                    serviceIDs,
                    document: { fileS3Key },
                };
            } else {
                postBody = {
                    name,
                    serviceIDs,
                };
            }
            createOptionValue(manufacturer.id, postBody);
        }
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
    { manufacturer },
) => {
    return {
        optionValues: manufacturersOptionValues[manufacturer.id]
            ? Object.values(manufacturersOptionValues[manufacturer.id])
            : [],
        subscriptionServiceIDs,
    };
};

const mapDispatchToProps = {
    createOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddOptionValueFormContainer),
);
