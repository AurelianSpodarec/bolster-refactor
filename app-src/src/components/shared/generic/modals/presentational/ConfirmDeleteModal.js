import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmDeleteModal = ({
    handleDelete,
    hideModal,
    message = 'Are you sure you want to delete this?'
}) => (
    <ModalOuterContainer>
        <BlockHeading title={message} />
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
