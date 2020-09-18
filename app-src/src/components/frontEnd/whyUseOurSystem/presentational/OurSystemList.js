import React from 'react';

import InfoCard from '../shared/presentational/InfoCard';

const OurSystemList = ({ title, icon, handleClick }) => {
    return (
        <div className="info-card-wrapper">
            <InfoCard title={title} icon={icon} handleClick={handleClick} />
        </div>
    );
};

export default OurSystemList;
