import React from 'react';
// import { Link } from 'react-router-dom';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const RecordPaymentModal = ({ hideModal }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Confirm payment" />

            <BlockButtonWrapper>
                <button
                    className="button green"
                    onClick={() => {
                        console.log('hey');
                    }}
                >
                    Buy
                </button>
                <ButtonContainer handleClick={hideModal}>
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default RecordPaymentModal;
