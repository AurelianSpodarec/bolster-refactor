import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const ConfirmDeleteDocumentVersionModal = ({
    handleDelete,
    hideModal,
    message = 'Are you sure you want to delete this?',
    isDeleting,
    deleteButtonText = 'Delete',
    icon = 'trash-alt',
    deleteSuccess,
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirm Delete Document Version'} />
        {isDeleting || deleteSuccess ? (
            <div className="size-lg-12">
                <Loading message="Deleting document version..." />
            </div>
        ) : (
            <>
                <p className="generic-text intro-text size-lg-12">{message}</p>
                <BlockButtonWrapper>
                    <button className="button red" onClick={handleDelete}>
                        <i className={`far fa-${icon} fa-fw`} />
                        {deleteButtonText}
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </>
        )}
    </ModalOuterContainer>
);

export default ConfirmDeleteDocumentVersionModal;
