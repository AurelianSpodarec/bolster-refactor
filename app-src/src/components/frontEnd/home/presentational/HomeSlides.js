import React from 'react';

const HomeSlides = ({ background, children, last }) => {
    return (
        <div
            style={{ backgroundImage: `url(${background})` }}
            className={`home-slides ${last ? 'last' : ''}`}
        >
            <div className="overlay" />
            {children}
        </div>
    );
};

export default HomeSlides;
