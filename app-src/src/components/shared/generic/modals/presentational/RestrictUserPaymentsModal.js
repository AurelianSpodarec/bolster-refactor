import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';

const RestrictUserPaymentsModal = ({ handleRestrict, hideModal, message }) => (
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
                    onClick={handleRestrict}
                />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default RestrictUserPaymentsModal;
