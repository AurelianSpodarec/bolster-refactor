import React from 'react';

import PassiveFire from '_content/images/frontend-new/why-use-our-system/passive-fire-protection.png';
import BolsterCloud from '_content/images/frontend-new/why-use-our-system/bolster-cloud.png';

import InfoCard from '../shared/presentational/InfoCard';

const OurSystemCloudList = () => (
    <div className="cloud-list-container">
        <div className="cloud-list">
            <div className="bolster-cloud-container">
                <img className="bolster-cloud" alt="Bolster Systems" src={BolsterCloud} />
            </div>

            <div className="list-wrapper top">
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
            </div>
            <div className="list-wrapper bottom">
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
                <InfoCard title="Lorem ipsum" icon={PassiveFire} hidePlusIcon />
            </div>
        </div>
    </div>
);

export default OurSystemCloudList;
