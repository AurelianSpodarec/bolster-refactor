import React, { useState, useEffect } from 'react';

const HomeCarouselControls = ({ active, max = 5 }) => {
    const [currentPage, setCurrentPage] = useState(active);
    const arr = Array(max).fill(0);

    useEffect(() => {
        setCurrentPage(active);
    }, [active]);

    return (
        <div className="frontend-carousel-controls">
            {arr.map((_el, index) => (
                <span
                    key={index}
                    className={`control-item ${currentPage === index ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

export default HomeCarouselControls;
