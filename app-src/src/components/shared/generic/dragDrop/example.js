import React, { useState } from 'react';
import Card from './Card';

const style = {
    width: 400
};
const Container = () => {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Write a cool JS library'
            },
            {
                id: 2,
                text: 'Make it generic enough'
            },
            {
                id: 3,
                text: 'Write README'
            },
            {
                id: 4,
                text: 'Create some examples'
            },
            {
                id: 5,
                text:
                    'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
            },
            {
                id: 6,
                text: '???'
            },
            {
                id: 7,
                text: 'PROFIT'
            }
        ]);
        const moveCard = (dragIndex, hoverIndex) => {
            const newArr = [...cards];
            newArr[dragIndex] = cards[hoverIndex];
            newArr[hoverIndex] = cards[dragIndex];

            setCards(newArr);
        };
        return (
            <div style={style}>
                {cards.map((card, i) => (
                    <Card
                        key={card.id}
                        index={i}
                        id={card.id}
                        text={card.text}
                        moveCard={moveCard}
                    />
                ))}
            </div>
        );
    }
};
export default Container;
