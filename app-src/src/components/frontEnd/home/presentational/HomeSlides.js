import React from 'react';

const HomeSlides = ({ background, children, last, ref }) => {
    if (last)
        return (
            <div
                ref={ref}
                style={{ backgroundImage: `url(${background})` }}
                className={`home-slides ${last ? 'last' : ''}`}
            >
                <div className="overlay" />
                {children}
            </div>
        );

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
