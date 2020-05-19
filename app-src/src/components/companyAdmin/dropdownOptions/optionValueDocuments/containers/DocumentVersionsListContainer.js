import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { COMPANY_DELETE_OPTION_VALUE_DOCUMENT_VERSION } from 'constants/shared/modalTypes';

import DocumentVersionsList from '../presentational/DocumentVersionsList';

class DocumentVersionsListContainer extends Component {
    render() {
        const versions = Object.values(this.props.document.versions);
        return (
            <DocumentVersionsList
                versions={versions}
                handleDeleteDocumentVersionModal={this.handleDeleteDocumentVersionModal}
                isReadOnly={this.props.isReadOnly}
            />
        );
    }

    handleDeleteDocumentVersionModal = version => {
        const { manufacturerID, showModal, document, optionValueID } = this.props;
        if (!version.hasBeenUsed) {
            showModal(COMPANY_DELETE_OPTION_VALUE_DOCUMENT_VERSION, {
                manufacturerID,
                optionValueID,
                document,
                version,
            });
        }
        //todo company admin delete document version redux and modal
    };
}

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(DocumentVersionsListContainer);
