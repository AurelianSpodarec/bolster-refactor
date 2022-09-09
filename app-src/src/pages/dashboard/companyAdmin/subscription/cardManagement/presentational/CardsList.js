import React from 'react';

import CardListItem from './CardListItem';

const CardsList = ({ cards, setPrimaryCard, deleteCard, headers, onMobile }) =>
    cards.map(card => (
        <CardListItem
            key={card.id}
            card={card}
            setPrimaryCard={() => setPrimaryCard(card.id)}
            deleteCard={() => deleteCard(card.id)}
            headers={headers}
            onMobile={onMobile}
        />
    ));

export default CardsList;
