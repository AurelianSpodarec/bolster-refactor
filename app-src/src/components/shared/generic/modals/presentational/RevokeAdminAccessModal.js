import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const RevokeAdminAccessModal = ({
    handleRevoke,
    hideModal,
    message = 'Are you sure you unlink this user from the device?',
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirmation'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" size="small" source="secondary" onClick={hideModal} />
                <ActionButton
                    type="submit"
                    text="Confirm"
                    size="small"
                    icon="check"
                    onClick={handleRevoke}
                />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default RevokeAdminAccessModal;
