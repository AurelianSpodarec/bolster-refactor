import React from 'react';

import BlockHeading from '../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Loading from '../../../../shared/generic/misc/presentational/Loading';

const PinTaskList = ({ isFetching, pinSeries, pinTasks }) => {
    if (isFetching) return <Loading />;
    return (
        <div className="size-lg-12">
            <BlockHeading title="Pin tasks" />

            {pinSeries.length ? (
                pinSeries.map(series => <p key={series.id}>{series.companyUserID}</p>)
            ) : (
                <p>No pin series</p>
            )}

            {pinTasks.length ? (
                pinTasks.map(task => <p key={task.id}>{task.companyUserID}</p>)
            ) : (
                <p>No pin series</p>
            )}
        </div>
    );
};

export default PinTaskList;
