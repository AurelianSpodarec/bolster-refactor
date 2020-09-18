import React from 'react';

import PlusIcon from '_content/images/frontend-new/why-use-our-system/plus-icon.png';

const InfoCard = ({ title, icon, handleClick }) => {
    return (
        <div className="info-card">
            <div className="icon-wrapper">
                <img src={icon} className="icon" />
            </div>
            <img src={PlusIcon} className="plus-icon" onClick={handleClick} />
            <div className="title-wrapper">
                <h2>{title}</h2>
                <div className="divider"></div>
            </div>
        </div>
    );
};

export default InfoCard;
