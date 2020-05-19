import React, { Component } from 'react';
import { connect } from 'react-redux';

import OptionValueDocumentsListItem from '../presentational/OptionValueDocumentsListItem';
import {
    COMPANY_EDIT_OPTION_VALUE_DOCUMENT,
    COMPANY_ADD_OPTION_VALUE_DOCUMENT_VERSION,
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class OptionValueDocumentsListItemContainer extends Component {
    state = { active: false };

    render() {
        const { document, optionValueID, isReadOnly, manufacturerID } = this.props;

        return (
            <OptionValueDocumentsListItem
                document={document}
                handleEditDocumentModal={this.handleEditDocumentModal}
                handleAddDocumentVersionModal={this.handleAddDocumentVersionModal}
                optionValueID={optionValueID}
                isReadOnly={isReadOnly}
                manufacturerID={manufacturerID}
            />
        );
    }

    handleEditDocumentModal = () => {
        const { showModal, document, optionValueID, manufacturerID } = this.props;
        showModal(COMPANY_EDIT_OPTION_VALUE_DOCUMENT, { manufacturerID, optionValueID, document });
    };

    handleAddDocumentVersionModal = () => {
        const { showModal, document, optionValueID, manufacturerID } = this.props;
        showModal(COMPANY_ADD_OPTION_VALUE_DOCUMENT_VERSION, {
            manufacturerID,
            optionValueID,
            document,
        });
    };
}

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(OptionValueDocumentsListItemContainer);
