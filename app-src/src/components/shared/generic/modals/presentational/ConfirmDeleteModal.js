import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmDeleteModal = ({
    handleDelete,
    hideModal,
    message = 'Are you sure you want to delete this?'
}) => (
    <ModalOuterContainer>
        <BlockHeadingWControls title={message} />
        <BlockButtonWrapper>
            <button className="button red" onClick={handleDelete}>
                Delete
            </button>
            <button className="button" onClick={hideModal}>
                <i className="fa fa-times" /> Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmDeleteModal;
