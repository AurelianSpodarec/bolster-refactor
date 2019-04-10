import React from 'react';

import CardListItem from './CardListItem';

const CardsList = ({ cards, setPrimaryCard }) =>
    cards.map(card => (
        <CardListItem
            key={card.id}
            card={card}
            setPrimaryCard={setPrimaryCard}
        />
    ));

export default CardsList;
