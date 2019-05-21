import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmEditPinModal = ({
    handleEditPin,
    hideModal,
    message = 'Are you sure you want to edit this pin?'
}) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirm Edit Pin'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <button className="button yellow" onClick={handleEditPin}>
                <i className="far fa-check" /> Confirm
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmEditPinModal;
