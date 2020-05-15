import React, { Component } from 'react';
import { connect } from 'react-redux';

import OptionValueDocumentsListItem from '../presentational/OptionValueDocumentsListItem';
import {
    ADMIN_EDIT_OPTION_VALUE_DOCUMENT,
    ADMIN_ADD_OPTION_VALUE_DOCUMENT_VERSION,
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class OptionValueDocumentsListItemContainer extends Component {
    state = { active: false };

    render() {
        const { document, optionValueID } = this.props;

        return (
            <OptionValueDocumentsListItem
                document={document}
                handleEditDocumentModal={this.handleEditDocumentModal}
                handleAddDocumentVersionModal={this.handleAddDocumentVersionModal}
                optionValueID={optionValueID}
            />
        );
    }

    handleEditDocumentModal = () => {
        const { showModal, document, optionValueID } = this.props;
        showModal(ADMIN_EDIT_OPTION_VALUE_DOCUMENT, { optionValueID, document });
    };

    handleAddDocumentVersionModal = () => {
        const { showModal, document, optionValueID } = this.props;
        showModal(ADMIN_ADD_OPTION_VALUE_DOCUMENT_VERSION, { optionValueID, document });
    };
}

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(OptionValueDocumentsListItemContainer);
