import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const UnlinkDeviceModal = ({
    handleUnlink,
    hideModal,
    message = 'Are you sure you unlink this user from the device?'
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirmation'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <button className="button red" onClick={handleUnlink}>
                <i className="far fa-unlink fa-faw" />
                Confirm Unlink
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default UnlinkDeviceModal;
