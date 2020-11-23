import React from 'react';

const CloudCard = ({ title = '' }) => {
    return (
        <div className="info-card cloud-card">
            <div className="title-wrapper">
                <h2>{title}</h2>
            </div>
            <div className="base">
                <div className="cloud" />
            </div>
        </div>
    );
};

export default CloudCard;
