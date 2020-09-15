import React from 'react';

const Slides = ({ background, children }) => (
    <div style={{ backgroundImage: `url(${background})` }} className="home-slides">
        <div className="overlay" />
        {children}
    </div>
);

export default Slides;
