import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmArchiveModal = ({
    handleArchive,
    hideModal,
    message = 'Are you sure you want to archive this?',
    archive = true
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Archive Confirmation" />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <button className="button blue" onClick={handleArchive}>
                <i className="fa fa-archive" />
                {archive ? 'Archive' : 'Un-Archive'}
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmArchiveModal;
