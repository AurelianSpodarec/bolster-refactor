import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmArchiveModal = ({
    handleArchive,
    hideModal,
    message = 'Are you sure you want to archive this?'
}) => (
    <ModalOuterContainer>
        <BlockHeading title={message} />
        <BlockButtonWrapper>
            <button className="button" onClick={handleArchive}>
                <i className="fa fa-archive" />
                Archive
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmArchiveModal;
