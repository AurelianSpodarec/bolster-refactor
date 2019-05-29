import React from 'react';

const ContentSection = ({ classes = '', children }) => (
    <div className={`info-section ${classes}`}>
        <div className="container">
            <div className="content">{children}</div>
        </div>
    </div>
);

export default ContentSection;
