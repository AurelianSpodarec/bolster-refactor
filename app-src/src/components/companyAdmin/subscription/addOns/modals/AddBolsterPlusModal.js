import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';
import PaymentMethod from '../../paymentMethod/PaymentMethod';
import usePaymentMethod from '../../paymentMethod/hooks/usePaymentMethod';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    BOLSTER_PLUS_PAYMENT_ERROR,
    BUY_BOLSTER_PLUS_CONFIRMATION,
} from 'constants/shared/modalTypes';
import useAddOnProrata from '../hooks/useAddOnProrata';
import { formatNumber } from 'helpers/generic';
import addServiceToSubscription from 'actions/companyAdmin/subscriptions/async/addServiceToSubscription';
import { addOnsType } from 'constants/companyAdmin/enums';
import usePrevious from 'hooks/usePrevious';
import {
    selectSubscriptionsError,
    selectSubscriptionsIsPosting,
    selectSubscriptionsPostError,
    selectSubscriptionsPostSuccess,
} from 'selectors/companyAdmin/subscriptions';

const AddBolsterPlusModal = ({ hideModal, handleClose }) => {
    const dispatch = useDispatch();
    const postSuccess = useSelector(selectSubscriptionsPostSuccess);
    const postFailure = useSelector(selectSubscriptionsPostError);
    const isPosting = useSelector(selectSubscriptionsIsPosting);
    const error = useSelector(selectSubscriptionsError);
    const prevSuccess = usePrevious(postSuccess);
    const prevFailure = usePrevious(postFailure);
    const location = useLocation();

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

    const postBody = {
        ...form,
        addonTypes: [addOnsType.BOLSTER_PLUS],
        creditsToBuy: null,
        serviceIDs: [],
    };

    if (addCardVisible)
        return <AddCardFormContainer close={hideAddCard} onSuccess={handleAddCardSuccess} />;

    const { newAnnualCost, proRataCost, currentAnnualCost } = useAddOnProrata();

    useEffect(() => {
        if (postSuccess && !prevSuccess) {
            dispatch(
                showModal(BUY_BOLSTER_PLUS_CONFIRMATION, {
                    paymentType: form.paymentType,
                    handleClose,
                }),
            );
        }
    }, [postSuccess, prevSuccess]);

    useEffect(() => {
        if (postFailure && !prevFailure) {
            dispatch(
                showModal(BOLSTER_PLUS_PAYMENT_ERROR, {
                    message:
                        error ||
                        'There was an error while purchasing your subscription. Please try again.',
                    resubmit: () => dispatch(addServiceToSubscription(postBody)),
                    handleClose,
                }),
            );
        }
    }, [postFailure, prevFailure]);

    return (
        <FlexModalOuter
            title="Add Bolster Plus Subscription"
            handleClose={() => {
                if (handleClose) {
                    handleClose();
                } else {
                    if (location.pathname === '/company/subscription') {
                        hideModal();
                    } else {
                        history.goBack();
                    }
                }

                hideModal();
            }}
        >
            <div className="flex-content">
                <p className="generic-text">
                    This service will be added to your subscription and will increase your yearly
                    renewal from £{formatNumber(currentAnnualCost)} to £
                    {formatNumber(newAnnualCost)} you will be billed pro-rata for your remaining
                    subscription, leaving a £{formatNumber(proRataCost)} (exc. VAT) fee to pay now.
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
                        onClick={() => {
                            if (handleClose) {
                                handleClose();
                            } else {
                                if (location.pathname === '/company/subscription') {
                                    hideModal();
                                } else {
                                    history.goBack();
                                }
                            }

                            hideModal();
                        }}
                        source="secondary"
                        size="medium"
                    />
                    <ActionButton
                        text="Buy"
                        icon={isPosting ? 'spinner' : ''}
                        iconSpin={isPosting}
                        disabled={isPosting}
                        onClick={() => {
                            dispatch(addServiceToSubscription(postBody));
                        }}
                        size="medium"
                    />
                </ButtonWrapper>

                <FlexWrapper justify="end">
                    <p>
                        By clicking Buy you are agreeing with Bolster System {''}
                        <a
                            href="/auth/terms"
                            target="_blank"
                            className="switched underline text-colour "
                        >
                            sales terms
                        </a>
                    </p>
                </FlexWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default AddBolsterPlusModal;
