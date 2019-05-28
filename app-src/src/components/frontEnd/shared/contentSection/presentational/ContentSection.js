import React from 'react';

const ContentSection = ({ classes = '', children }) => (
    <div className={`info-section ${classes}`}>{children}</div>
);

export default ContentSection;
