import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import React from 'react';
import CostingAndEstimatingPod from './CostingAndEstimatingPod';

const CostingAndEstimatingPods = ({ data = [], isFetching, fetchError }) => {
    return (
        <div className="pods">
            {isFetching && !fetchError && <Loading />}
            {data.length &&
                !isFetching &&
                !fetchError &&
                data.map((pod, i) => <CostingAndEstimatingPod pod={pod} key={i} />)}
            {fetchError && <Error>{fetchError}</Error>}
        </div>
    );
};

export default CostingAndEstimatingPods;
