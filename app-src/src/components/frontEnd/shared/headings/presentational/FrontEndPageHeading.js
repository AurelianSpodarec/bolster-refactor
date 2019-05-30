import React from 'react';

const FrontEndPageHeading = ({
    title = '',
    subTitle = '',
    backgroundImage = ''
}) => (
    <div className="intro-banner">
        <div className="container" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <div className="text">
                <h1>{title}</h1>
                <p>{subTitle}</p>
            </div>
            <div className="clear" />
        </div>
    </div>
);

export default FrontEndPageHeading;
