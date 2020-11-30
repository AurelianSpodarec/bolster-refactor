import React from 'react';
import FrontEndButton from '../../buttons/presentational/FrontEndButton';

const BackToTop = ({ handleScrollToTop }) => {
    return (
        <div className="request-demo-banner">
            <FrontEndButton classes="gray" to="/contact">
                Contact
            </FrontEndButton>
            <div className="back-to-top-wrapper">
                <div className="back-to-top">
                    <i onClick={handleScrollToTop} className="far fa-chevron-up" />
                </div>
            </div>
        </div>
    );
};

export default BackToTop;
