import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createOptionValue from 'actions/superAdmin/manufacturers/async/createOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddOptionValueForm from '../presentational/AddOptionValueForm';
import services from 'reducers/companyAdmin/services';

class AddOptionValueFormContainer extends Component {
    state = {
        name: '',
        serviceIDs: [],
        confirmNoDocument: false,
        fileS3Key: '',
        showConfirmNoDocument: false,
        docName: '',
    };

    render() {
        const { services } = this.props;

        const serviceOptions = services.map(({ id, name }) => ({
            value: id,
            label: name,
        }));

        return (
            <AddOptionValueForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
                serviceOptions={serviceOptions}
                handleShowAddDocForm={this.handleShowAddDocForm}
            />
        );
    }

    componentDidMount = () => {
        const { services } = this.props;

        const serviceIDs = services.map(({ id }) => id);

        this.setState({ serviceIDs: [...serviceIDs] });
    };

    handleInputChange = (name, value) => {
        const { confirmNoDocument } = this.state;

        if (name === 'fileS3Key' && !confirmNoDocument) {
            this.setState({ showConfirmNoDocument: false });
        }

        this.setState({ [name]: value });
    };

    validateName = value => {
        const { optionValues } = this.props;
        const nameTaken = optionValues.some(optionValue => optionValue.name === value);
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleShowAddDocForm = () => {
        const { confirmNoDocument } = this.state;

        this.setState({ confirmNoDocument: !confirmNoDocument });
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
            docName,
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
                    document: { fileS3Key, name: docName },
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
}

const mapStateToProps = (
    {
        superAdmin: {
            manufacturersOptionValuesReducer: { manufacturersOptionValues },
        },
    },
    { manufacturer },
) => {
    return {
        optionValues: manufacturersOptionValues[manufacturer.id]
            ? Object.values(manufacturersOptionValues[manufacturer.id])
            : [],
    };
};

const mapDispatchToProps = {
    createOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddOptionValueFormContainer),
);
