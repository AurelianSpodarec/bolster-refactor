import React from 'react';

import BolsterCloud from '_content/images/frontend-new/why-use-our-system/bolster-cloud-new1.png';

import { topList, bottomList } from 'constants/frontEnd/cloudList';
import { useCloudShouldAnimate } from 'helpers/frontEndHooks';

import CloudCard from '../shared/presentational/CloudCard';

const OurSystemCloudList = () => {
    const [ref, isVisible] = useCloudShouldAnimate();

    return (
        <div ref={ref} className="cloud-list-container">
            <div className="cloud-list">
                <div className="bolster-cloud-container">
                    <img className="bolster-cloud" alt="Bolster Systems" src={BolsterCloud} />
                </div>

                <div className="list-wrapper top">
                    {topList.map(({ title }, index) => (
                        <CloudCard
                            key={index}
                            title={title}
                            left={index === 0 || index === 1}
                            secondary={index === 1 || index === 2}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
                <div className="list-wrapper bottom">
                    {bottomList.map(({ title }, index) => (
                        <CloudCard
                            key={index}
                            title={title}
                            left={index === 0 || index === 1}
                            secondary={index === 1 || index === 2}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurSystemCloudList;
