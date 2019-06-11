import React from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { DOCUMENT_RESPONSE_AGREEANCE } from 'constants/shared/modalTypes';
import DocumentResponsesTableItem from '../presentational/DocumentResponsesTableItem';

const DocumentResponsesTableItemContainer = ({
    response,
    user,
    showModal,
    hideModal
}) => {
    return (
        <DocumentResponsesTableItem
            response={response}
            user={user}
            handleShowModal={handleShowModal}
        />
    );

    function handleShowModal() {
        showModal(DOCUMENT_RESPONSE_AGREEANCE, { hideModal, response, user });
    }
};

const mapDispatchToProps = { showModal, hideModal };

export default connect(
    null,
    mapDispatchToProps
)(DocumentResponsesTableItemContainer);
