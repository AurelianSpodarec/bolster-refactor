import React from 'react';

import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';
import PaymentMethod from '../../paymentMethod/PaymentMethod';
import usePaymentMethod from '../../paymentMethod/hooks/usePaymentMethod';

const AddBolsterPlusModal = ({
    hideModal,

    hideAddCard,

    isPosting,
}) => {
    const {
        handleChange,
        handleSubmit,
        form,
        cardOptions,
        addCardVisible,
        cards,
        handleAddCardSuccess,
        showAddCard,
    } = usePaymentMethod(showAddCard);

    console.log(addCardVisible);
    if (addCardVisible)
        return <AddCardFormContainer close={hideAddCard} onSuccess={handleAddCardSuccess} />;

    return (
        <FlexModalOuter title="Add Bolster Plus Subscription">
            <div className="flex-content">
                <p className="generic-text">This service will be added ...</p>

                <PaymentMethod
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cards={cardOptions}
                    paymentType={form.paymentType}
                    selectedCard={form.stripeCardID}
                    noCards={!cards.length}
                    showAddCard={showAddCard}
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
                        type="submit"
                        icon={isPosting ? 'spinner' : ''}
                        iconSpin={isPosting}
                        disabled={isPosting}
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
