import React from 'react';

const CloudCard = ({ title = '', left, secondary, isVisible }) => {
    return (
        <div
            className={`info-card cloud-card ${left ? 'left' : 'right'} ${
                secondary ? 'secondary' : 'primary'
            } ${isVisible ? 'visible' : 'hidden'}`}
        >
            <div className="title-wrapper">
                <h2>{title}</h2>
            </div>
            <div className="base">
                <div className="box">
                    <div className="cloud" />
                </div>
            </div>
        </div>
    );
};

export default CloudCard;
