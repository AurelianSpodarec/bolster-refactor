import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActionButton from '../../button/presentational/ActionButton';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';

const UnlinkDeviceModal = ({
    handleUnlink,
    hideModal,
    message = 'Are you sure you unlink this user from the device?',
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirmation'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>

        <div className="size-lg-12">
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" onClick={hideModal} size="small" source="secondary" />
                <ActionButton
                    text="Confirm Unlink"
                    onClick={handleUnlink}
                    size="small"
                    icon="link"
                />
            </ButtonWrapper>
        </div>
    </ModalOuterContainer>
);

export default UnlinkDeviceModal;
