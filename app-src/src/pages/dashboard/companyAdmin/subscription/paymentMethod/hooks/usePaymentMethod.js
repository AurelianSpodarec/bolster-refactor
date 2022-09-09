import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import { PAYMENT_ERROR, PAYMENT_SUCCESS } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import {
    selectCards,
    selectCardsIsFetching,
    selectCardsPostError,
    selectCardsPostSuccess,
} from 'selectors/companyAdmin/cards';

const usePaymentMethod = () => {
    const dispatch = useDispatch();
    const cards = useSelector(selectCards);
    const isFetching = useSelector(selectCardsIsFetching);
    const postSuccess = useSelector(selectCardsPostSuccess);
    const postError = useSelector(selectCardsPostError);
    const prevProps = usePrevious({ postSuccess, postError, isFetching });

    const [addCardVisible, setCardVisible] = useState(false);
    const [form, handleChange] = useForm({
        paymentType: 2,
        stripeCardID: null,
        idempotencyKey: null,
    });

    const cardOptions = cards.map(card => ({
        label: `${card.nickname || card.name} - ${card.lastFour}`,
        value: card.id,
    }));

    const handleAddCardSuccess = card => {
        handleChange('stripleCardID', card.id);
        setCardVisible(false);
    };

    const showAddCard = () => {
        setCardVisible(true);
    };

    const hideAddCard = () => {
        setCardVisible(false);
    };

    useEffect(() => {
        dispatch(fetchAllCards());
    }, [dispatch]);

    useEffect(() => {
        const { paymentType } = form;

        if (!isFetching && prevProps.isFetching) {
            const primaryCard = cards.find(({ isPrimary }) => isPrimary);
            handleChange('stripeCardID', primaryCard ? primaryCard.id : null);
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(PAYMENT_SUCCESS, {
                message: `Your order has been successfully placed and your Bolster Plus upgrade ${
                    +paymentType === PAYMENT_IDS.CARD
                        ? 'have been added.'
                        : 'will be available once the invoice has been paid'
                }`,
            });
        }

        if (postError && !prevProps.postError) {
            showModal(PAYMENT_ERROR, {
                message:
                    'There was an error while purchasing Bolster Plus upgrade. Please try again.',
            });
        }
    }, [isFetching, postSuccess, postError, prevProps]);

    return {
        form,
        handleChange,
        cards: cardOptions,
        showAddCard,
        hideAddCard,
        addCardVisible,
        handleAddCardSuccess,
    };
};

export default usePaymentMethod;
