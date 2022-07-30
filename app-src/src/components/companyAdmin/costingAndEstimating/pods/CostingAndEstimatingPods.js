import Error from 'components/shared/generic/misc/presentational/Error';
import React from 'react';
import LoadingOverlay from '../LoadingOverlay';
import CostingAndEstimatingPod from './CostingAndEstimatingPod';

const CostingAndEstimatingPods = ({ data = [], isFetching, fetchError }) => {
    return (
        <div className="pods">
            {data.length &&
                !fetchError &&
                data.map((pod, i) => <CostingAndEstimatingPod pod={pod} key={i} />)}
            {!data.length && <div style={{ minHeight: '203.44px' }} />}
            {fetchError && <Error>{fetchError}</Error>}
            {isFetching && !fetchError && <LoadingOverlay />}
        </div>
    );
};

export default CostingAndEstimatingPods;
