import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDocumentForOptionValue from 'actions/companyAdmin/manufacturers/async/createDocumentForOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddDocumentToOptionValueForm from '../presentational/AddDocumentToOptionValueForm';

class AddDocumentToOptionValueFormContainer extends Component {
    state = {
        name: '',
        fileS3Key: '',
    };

    render() {
        const { filesUploading } = this.props;

        return (
            <AddDocumentToOptionValueForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
                filesUploading={filesUploading}
            />
        );
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const { documents } = this.props;
        const nameTaken = documents.some(document => document.name === value);
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createDocumentForOptionValue, optionValue, filesUploading } = this.props;

        if (!filesUploading) {
            const postBody = {
                ...this.state,
            };

            createDocumentForOptionValue(optionValue.manufacturerID, optionValue.id, postBody);
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            optionValueDocumentsReducer: { optionValueDocuments },
        },
        shared: {
            filesUploadingReducer: { filesUploading },
        },
    },
    { optionValue },
) => {
    return {
        documents: optionValueDocuments[optionValue.id]
            ? Object.values(optionValueDocuments[optionValue.id])
            : [],
        filesUploading,
    };
};

const mapDispatchToProps = {
    createDocumentForOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddDocumentToOptionValueFormContainer),
);
