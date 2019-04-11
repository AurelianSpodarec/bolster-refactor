import React from 'react';

import CardListItem from './CardListItem';

const CardsList = ({ cards, setPrimaryCard }) =>
    cards.map(card => (
        <CardListItem
            key={card.id}
            card={card}
            setPrimaryCard={id => setPrimaryCard(cards, id)}
        />
    ));

export default CardsList;
