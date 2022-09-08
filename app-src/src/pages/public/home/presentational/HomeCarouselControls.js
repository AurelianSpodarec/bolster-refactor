import React, { useState, useEffect } from 'react';

const HomeCarouselControls = ({ active, handleClick, last = false, max = 5, isMobile }) => {
    const [currentPage, setCurrentPage] = useState(active);
    const arr = Array(max).fill(0);

    useEffect(() => {
        setCurrentPage(active);
    }, [active]);

    if (isMobile) return null;

    return (
        <div
            id={`${last ? 'carouselControlsLast' : 'carouselControls'}`}
            className="frontend-carousel-controls"
        >
            {arr.map((_el, index) => (
                <span
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`control-item ${currentPage === index ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

export default HomeCarouselControls;
