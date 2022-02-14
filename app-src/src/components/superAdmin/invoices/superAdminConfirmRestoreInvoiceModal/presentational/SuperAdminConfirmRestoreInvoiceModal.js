import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const SuperAdminConfirmRestoreInvoiceModal = ({
    handleRestore,
    hideModal,
    message = 'Are you sure you want to restore this?',
    isRestoring,
    restoreButtonText = 'Restore',
    icon = 'trash-alt',
    restoreSuccess,
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirm Restore Invoice'} />
        {isRestoring || restoreSuccess ? (
            <div className="size-lg-12">
                <Loading message="Restoring invoice..." />
            </div>
        ) : (
            <>
                <p className="generic-text intro-text size-lg-12">{message}</p>

                <BlockButtonWrapper>
                    <button className="button red" onClick={handleRestore}>
                        <i className={`far fa-${icon} fa-fw`} />
                        {restoreButtonText}
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </>
        )}
    </ModalOuterContainer>
);

export default SuperAdminConfirmRestoreInvoiceModal;
