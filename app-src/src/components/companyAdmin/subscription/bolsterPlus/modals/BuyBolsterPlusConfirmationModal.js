import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import AddOnProrata from '../AddOnProrata';

const BuyBolsterPlusConfirmationModal = ({ hideModal, isPosting }) => {
    return (
        <FlexModalOuter title="Buy Bolster Plus Subscription">
            <div className="flex-content">
                <AddOnProrata />

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        onClick={hideModal}
                        source="secondary"
                        size="medium"
                    />
                    <ActionButton
                        text="Confirm"
                        type="submit"
                        icon={isPosting ? 'spinner' : ''}
                        iconSpin={isPosting}
                        disabled={isPosting}
                        size="medium"
                    />
                </ButtonWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default BuyBolsterPlusConfirmationModal;
