import React from 'react';

import CardListItem from './CardListItem';

const CardsList = ({ cards }) =>
    cards.map(card => <CardListItem key={card.id} card={card} />);

export default CardsList;
