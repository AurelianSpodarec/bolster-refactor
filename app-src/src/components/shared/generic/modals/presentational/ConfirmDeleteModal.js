import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Error from '../../misc/presentational/Error';

const ConfirmDeleteModal = ({
    handleDelete,
    hideModal,
    handleCancel = hideModal,
    message = 'Are you sure you want to delete this?',
    isIncoming = false,
    deleteButtonText = 'Delete',
    icon = 'trash-alt',
    isPosting = false,
    error = null,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Confirmation'} />
            <p className="generic-text intro-text size-lg-12">{message}</p>
            {error && <Error>{error}</Error>}
        <BlockButtonWrapper>
            <button
                className={`button red ${isPosting ? 'disabled' : ''}`}
                onClick={handleDelete}
                disabled={isPosting}
            >
                {isIncoming ? (
                    <>
                        <i className="far fa-ban fa-fw" />
                        Decline
                    </>
                ) : (
                    <>
                        <i className={`far fa-${icon} fa-fw`} />
                        {deleteButtonText}
                    </>
                )}
            </button>
            <button className="button" onClick={handleCancel}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
)};

export default ConfirmDeleteModal;
