import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import OptionValueDocumentsListItem from '../presentational/OptionValueDocumentsListItem';
import { ADMIN_EDIT_OPTION_VALUE_DOCUMENT } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class OptionValueDocumentsListItemContainer extends Component {
    state = { active: false };

    render() {
        const { document } = this.props;

        return (
            <OptionValueDocumentsListItem
                document={document}
                handleEditDocumentModal={this.handleEditDocumentModal}
            />
        );
    }

    componentDidUpdate = prevProps => {};

    handleEditDocumentModal = () => {
        const { showModal, document, optionValueID } = this.props;
        showModal(ADMIN_EDIT_OPTION_VALUE_DOCUMENT, { optionValueID, document });
    };

    handleAddDocumentVersionModal = () => {
        //todo add version to document modal and reducers
    };
}

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(OptionValueDocumentsListItemContainer);
