import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const ConfirmEditPinModal = ({
    handleEditPin,
    hideModal,
    message = 'Are you sure you want to edit this pin?',
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirm Edit Pin'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>

        <div className="size-lg-12">
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
                <ActionButton text="Confirm" onClick={handleEditPin} icon="check" size="small" />
            </ButtonWrapper>
        </div>
    </ModalOuterContainer>
);

export default ConfirmEditPinModal;
