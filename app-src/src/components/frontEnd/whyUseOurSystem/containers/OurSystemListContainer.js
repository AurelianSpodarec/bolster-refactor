import React from 'react';

import OurSystemList from '../presentational/OurSystemList';
import { InfoCardList } from 'constants/frontEnd/infoCard';

const OurSystemListContainer = () => {
    return (
        <div className="our-system-list-wrapper">
            <div className="info-card-list-wrapper">
                {InfoCardList.map(({ title, icon }, index) => {
                    return (
                        <OurSystemList
                            title={title}
                            icon={icon}
                            handleClick={handleClick}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );

    function handleClick() {
        console.log('inside handle click');
    }
};

export default OurSystemListContainer;
