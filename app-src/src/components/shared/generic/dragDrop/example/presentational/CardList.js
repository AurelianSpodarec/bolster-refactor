import React from 'react';
import CardContainer from '../containers/CardContainer';

const style = {
    width: '200px',
    height: '404px',
    border: '1px dashed gray'
};

const CardList = ({ isActive, cards }) => (
    <div
        style={{ ...style, backgroundColor: isActive ? 'lightgreen' : '#FFF' }}
    >
        {cards.map((card, i) => {
            return (
                <CardContainer
                    key={card.id}
                    index={i}
                    listId={this.props.id}
                    card={card}
                    removeCard={this.removeCard.bind(this)}
                    moveCard={this.moveCard.bind(this)}
                />
            );
        })}
    </div>
);

export default CardList;
