import React from 'react';
import CostingAndEstimatingPod from './CostingAndEstimatingPod';

const CostingAndEstimatingPods = ({ data }) => {
    return (
        <div className="pods">
            {data.map((pod, i) => (
                <CostingAndEstimatingPod pod={pod} key={i} />
            ))}
        </div>
    );
};

export default CostingAndEstimatingPods;
