import React from 'react';

import PlusIcon from '_content/images/frontend-new/why-use-our-system/plus-icon.png';

const InfoCard = ({ title = '', icon, hidePlusIcon = false, handleClick = () => {} }) => {
    return (
        <div className={`info-card ${!hidePlusIcon ? 'clickable' : ''}`} onClick={handleClick}>
            {icon && (
                <div className="icon-wrapper">
                    <img src={icon} className="icon" />
                </div>
            )}
            {!hidePlusIcon && <img src={PlusIcon} className="plus-icon" />}
            <div className="title-wrapper">
                <h2>{title}</h2>
                <div className="divider"></div>
            </div>
        </div>
    );
};

export default InfoCard;
