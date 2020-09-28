import React from 'react';

const BackToTop = ({ handleScrollToTop }) => {
    return (
        <div className="back-to-top-container">
            <i onClick={handleScrollToTop} className="far fa-chevron-up" />
        </div>
    );
};

export default BackToTop;
