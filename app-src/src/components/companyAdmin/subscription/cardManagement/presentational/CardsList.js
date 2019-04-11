import React from 'react';

import CardListItem from './CardListItem';

const CardsList = ({ cards, setPrimaryCard, deleteCard }) =>
    cards.map(card => (
        <CardListItem
            key={card.id}
            card={card}
            setPrimaryCard={() => setPrimaryCard(cards, card.id)}
            deleteCard={() => deleteCard(card.id)}
        />
    ));

export default CardsList;
