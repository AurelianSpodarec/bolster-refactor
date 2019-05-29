import React from 'react';

const ContentSection = ({ classes = '', id = '', children }) => (
    <div id={id} className={`info-section ${classes}`}>
        <div className="container">
            <div className="content">{children}</div>
        </div>
    </div>
);

export default ContentSection;
