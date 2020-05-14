import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createNewDocumentVersion from 'actions/superAdmin/manufacturers/async/createNewDocumentVersion';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddNewDocumentVersionForm from '../presentational/AddNewDocumentVersionForm';

class AddNewDocumentVersionFormContainer extends Component {
    state = {
        fileS3Key: '',
    };

    render() {
        const { filesUploading } = this.props;

        return (
            <AddNewDocumentVersionForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                filesUploading={filesUploading}
            />
        );
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createNewDocumentVersion, document, filesUploading } = this.props;

        if (!filesUploading) {
            const postBody = {
                ...this.state,
            };

            createNewDocumentVersion(document.id, postBody);
        }
    };
}

const mapStateToProps = ({
    shared: {
        filesUploadingReducer: { filesUploading },
    },
}) => {
    return {
        filesUploading,
    };
};

const mapDispatchToProps = {
    createNewDocumentVersion,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddNewDocumentVersionFormContainer),
);
