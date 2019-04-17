import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmDeleteModal = ({
    handleDelete,
    hideModal,
    message = 'Are you sure you want to delete this?',
    isIncoming = false
}) => (
    <ModalOuterContainer>
        <BlockHeading title={message} />
        <BlockButtonWrapper>
            <button className="button red" onClick={handleDelete}>
                {isIncoming ? (
                    <>
                        <i className="far fa-ban fa-fw" />
                        Decline
                    </>
                ) : (
                    <>
                        <i className="far fa-trash-alt fa-fw" />
                        Delete
                    </>
                )}
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmDeleteModal;
