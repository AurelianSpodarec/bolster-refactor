import React from 'react';
import { useDispatch } from 'react-redux';

import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';
import PaymentMethod from '../../paymentMethod/PaymentMethod';
import usePaymentMethod from '../../paymentMethod/hooks/usePaymentMethod';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { BUY_BOLSTER_PLUS_CONFIRMATION } from 'constants/shared/modalTypes';
import useAddOnProrata from '../hooks/useAddOnProrata';

const AddBolsterPlusModal = ({ hideModal }) => {
    const dispatch = useDispatch();
    const {
        handleChange,
        handleSubmit,
        form,
        addCardVisible,
        cards,
        handleAddCardSuccess,
        showAddCard,
        hideAddCard,
    } = usePaymentMethod();

    if (addCardVisible)
        return <AddCardFormContainer close={hideAddCard} onSuccess={handleAddCardSuccess} />;

    const { newAnnualCostWithVAT, proRataCost, currentAnnualCostWithVAT } = useAddOnProrata();

    return (
        <FlexModalOuter title="Add Bolster Plus Subscription">
            <div className="flex-content">
                <p className="generic-text">
                    This service will be added to your subscription and will increase your yearly
                    renewal from £{currentAnnualCostWithVAT} to £{newAnnualCostWithVAT} you will be
                    billed pro-rata for your remaining subscription, leaving a £{proRataCost} (exc.
                    VAT) fee to pay now.
                </p>

                <PaymentMethod
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cards={cards}
                    paymentType={form.paymentType}
                    selectedCard={form.stripeCardID}
                    noCards={!cards.length}
                    showAddCard={showAddCard}
                    hideAddCard={hideAddCard}
                />

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        onClick={hideModal}
                        source="secondary"
                        size="medium"
                    />
                    <ActionButton
                        text="Buy"
                        onClick={() =>
                            dispatch(
                                showModal(BUY_BOLSTER_PLUS_CONFIRMATION, {
                                    paymentType: form.paymentType,
                                }),
                            )
                        }
                        size="medium"
                    />
                </ButtonWrapper>

                <FlexWrapper justify="end">
                    <p>
                        By clicking Buy you are agreeing with Bolster System {''}
                        <a to="/auth/terms" target="_blank" className="switched underline">
                            sales terms
                        </a>
                    </p>
                </FlexWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default AddBolsterPlusModal;
