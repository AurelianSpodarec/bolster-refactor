import React from 'react';

const AccordionButton = ({ active, onClick = () => {} }) => {
    const _handleClick = e => {
        e.preventDefault();
        onClick();
    };
    return (
        <button onClick={_handleClick} className={`accordion-button ${active ? 'active' : ''}`}>
            <i className="fa fa-chevron-down" />
        </button>
    );
};

export default AccordionButton;
