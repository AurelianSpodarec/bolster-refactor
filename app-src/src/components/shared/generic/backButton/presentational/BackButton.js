import React from 'react';

const BackButton = ({ handleClick }) => (
    <button className="button back" onClick={handleClick}>
        <i className="fa fa-chevron-double-left" /> Back
    </button>
);

export default BackButton;
