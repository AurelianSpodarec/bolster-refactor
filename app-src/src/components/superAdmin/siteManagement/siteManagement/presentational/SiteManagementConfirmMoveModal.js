import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SiteManagementConfirmMoveModal = ({
    moveFromName,
    moveToName,
    hideModal,
    handleSubmit
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Please confirm" />
        <p className="generic-text size-lg-12">
            Are you sure you would like to make this change?
        </p>
        <p className="size-lg-12">{`${moveFromName} --> ${moveToName}`}</p>

        <BlockButtonWrapper>
            <button className="button green" onClick={handleSubmit}>
                Confirm
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default SiteManagementConfirmMoveModal;
