import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editOptionValueDocument from 'actions/superAdmin/manufacturers/async/editOptionValueDocument';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import EditOptionValueDocumentForm from '../presentational/EditOptionValueDocumentForm';

class EditOptionValueDocumentFormContainer extends Component {
    state = {
        name: this.props.document.name,
    };

    render() {
        return (
            <EditOptionValueDocumentForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
            />
        );
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const { documents, document: documentBeingEdited } = this.props;

        const nameTaken = documents.some(
            document => document.name === value && document.id !== documentBeingEdited.id,
        );
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editOptionValueDocument, optionValueID, document } = this.props;
        const postBody = {
            ...this.state,
        };
        editOptionValueDocument(optionValueID, document.id, postBody);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            optionValueDocumentsReducer: { optionValueDocuments },
        },
    },
    { optionValueID },
) => {
    return {
        documents: optionValueDocuments[optionValueID]
            ? Object.values(optionValueDocuments[optionValueID])
            : [],
    };
};

const mapDispatchToProps = {
    editOptionValueDocument,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditOptionValueDocumentFormContainer),
);
