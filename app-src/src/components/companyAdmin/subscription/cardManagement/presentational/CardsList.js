import React from 'react';

import CardListItem from './CardListItem';
import deleteCard from 'actions/companyAdmin/cards/async/deleteCard';

const CardsList = ({ cards, setPrimaryCard }) =>
    cards.map(card => (
        <CardListItem
            key={card.id}
            card={card}
            setPrimaryCard={() => setPrimaryCard(cards, card.id)}
            deleteCard={() => deleteCard(card.id)}
        />
    ));

export default CardsList;
