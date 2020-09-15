import React from 'react';

const BackToTop = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="back-to-top-container">
            <i onClick={handleScrollToTop} className="far fa-chevron-up" />
        </div>
    );
};

export default BackToTop;
