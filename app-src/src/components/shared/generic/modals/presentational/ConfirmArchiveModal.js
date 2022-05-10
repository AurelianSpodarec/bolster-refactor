import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const ConfirmArchiveModal = ({
    handleArchive,
    hideModal,
    message = 'Are you sure you want to archive this?',
    archive = true,
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Archive Confirmation" />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <ActionButton
                type="submit"
                text={archive ? 'Archive' : 'Un-Archive'}
                icon="fa fa-archive"
                onClick={handleArchive}
            />
            <ActionButton source="secondary" text="Cancel" onClick={hideModal} />
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmArchiveModal;
