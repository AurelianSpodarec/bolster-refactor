import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import { useForm } from 'helpers/hooks';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCards } from 'selectors/companyAdmin/cards';

const usePaymentMethod = () => {
    const cards = useSelector(selectCards);
    const [addCardVisible, setCardVisible] = useState(false);
    const [form, handleChange] = useForm({
        paymentType: null,
        stripeCardID: null,
        idempotencyKey: null,
    });

    const cardOptions = cards.map(card => ({
        label: `${card.nickname || card.name} - ${card.lastFour}`,
        value: card.id,
    }));

    const handleSubmit = e => {
        e.preventDefault();

        const { paymentType, stripeCardID, idempotencyKey } = form;

        // if (isPosting) return;
        const postBody = {
            paymentType,
            stripeCardID: +paymentType === PAYMENT_IDS.CARD ? stripeCardID : null,
            idempotencyKey,
        };

        // action(postBody);
    };

    const handleAddCardSuccess = card => {
        handleChange('stripleCardID', card.id);
        setCardVisible(false);
    };

    const showAddCard = () => {
        setCardVisible(true);
    };

    return {
        form,
        handleChange,
        handleSubmit,
        cardOptions,
        showAddCard,
        addCardVisible,
        cards,
        handleAddCardSuccess,
    };
};

export default usePaymentMethod;
