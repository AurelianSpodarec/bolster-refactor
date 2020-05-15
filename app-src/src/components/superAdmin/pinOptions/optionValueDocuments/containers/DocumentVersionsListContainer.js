import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADMIN_DELETE_OPTION_VALUE_DOCUMENT_VERSION } from 'constants/shared/modalTypes';

import DocumentVersionsList from '../presentational/DocumentVersionsList';

class DocumentVersionsListContainer extends Component {
    render() {
        const versions = Object.values(this.props.document.versions);
        return (
            <DocumentVersionsList
                versions={versions}
                handleDeleteDocumentVersionModal={this.handleDeleteDocumentVersionModal}
            />
        );
    }

    handleDeleteDocumentVersionModal = version => {
        const { showModal, document, optionValueID } = this.props;
        if (!version.hasBeenUsed) {
            showModal(ADMIN_DELETE_OPTION_VALUE_DOCUMENT_VERSION, {
                optionValueID,
                document,
                version,
            });
        }
    };
}

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(DocumentVersionsListContainer);
