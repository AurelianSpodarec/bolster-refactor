import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const RevokeAdminAccessModal = ({
    handleRevoke,
    hideModal,
    message = 'Are you sure you unlink this user from the device?'
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirmation'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <button className="button green" onClick={handleRevoke}>
                <i className="far fa-check fa-faw" />
                Confirm
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default RevokeAdminAccessModal;
