import React from 'react';

import BolsterCloud from '_content/images/frontend-new/why-use-our-system/bolster-cloud-new1.png';

import { topList, bottomList } from 'constants/frontEnd/cloudList';
import { useCloudShouldAnimate } from 'helpers/frontEndHooks';
import { useIsMobile } from 'helpers/hooks';

import CloudCard from '../shared/presentational/CloudCard';

const OurSystemCloudList = () => {
    const [ref, isVisible] = useCloudShouldAnimate();
    const isMobile = useIsMobile(1101);
    console.log(isMobile);

    return (
        <div ref={ref} className="cloud-list-container">
            <div className="cloud-list">
                <div className="bolster-cloud-container">
                    <img className="bolster-cloud" alt="Bolster Systems" src={BolsterCloud} />
                </div>

                <div className="list-wrapper top">
                    {topList.map(({ title }, index) => {
                        const left = !isMobile ? index === 0 || index === 1 : index % 2;
                        const secondary = !isMobile ? index === 1 || index === 2 : false;
                        return (
                            <CloudCard
                                key={index}
                                title={title}
                                left={left}
                                secondary={secondary}
                                isVisible={isVisible}
                            />
                        );
                    })}
                </div>
                <div className="list-wrapper bottom">
                    {bottomList.map(({ title }, index) => {
                        const left = !isMobile ? index === 0 || index === 1 : index % 2;
                        const secondary = !isMobile ? index === 1 || index === 2 : false;
                        return (
                            <CloudCard
                                key={index}
                                title={title}
                                left={left}
                                secondary={secondary}
                                isVisible={isVisible}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OurSystemCloudList;
