import React from 'react';

import BolsterCloud from '_content/images/frontend-new/why-use-our-system/bolster-cloud-new1.png';

import { topList, bottomList } from 'constants/frontEnd/cloudList';

import CloudCard from '../shared/presentational/CloudCard';

const OurSystemCloudList = () => (
    <div className="cloud-list-container">
        <div className="cloud-list">
            <div className="bolster-cloud-container">
                <img className="bolster-cloud" alt="Bolster Systems" src={BolsterCloud} />
            </div>

            <div className="list-wrapper top">
                {topList.map(({ icon, title }, index) => (
                    <CloudCard key={index} title={title} icon={icon} hidePlusIcon />
                ))}
            </div>
            <div className="list-wrapper bottom">
                {bottomList.map(({ icon, title }, index) => (
                    <CloudCard key={index} title={title} icon={icon} hidePlusIcon />
                ))}
            </div>
        </div>
    </div>
);

export default OurSystemCloudList;
