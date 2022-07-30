import React from 'react';

import Loading from '../../../../shared/generic/misc/presentational/Loading';

import PinSeriesItem from './PinSeriesItem';
import PinTaskItem from './PinTaskItem';

const PinTaskList = ({ isFetching, pinSeries, nonRecurringPinTasks }) => {
    if (isFetching) return <Loading />;

    return (
        <div className="size-lg-12 single-pin-tasks-wrapper">
            <h3 className="heading heading-3">Pin series</h3>
            <div className="list-wrapper">
                {pinSeries.length ? (
                    pinSeries.map(task => <PinSeriesItem key={task.id} task={task} />)
                ) : (
                    <p>No pin series</p>
                )}
            </div>

            <h3 className="heading heading-3">Pin tasks</h3>
            <div className="list-wrapper">
                <div>
                    {nonRecurringPinTasks.length ? (
                        nonRecurringPinTasks.map(task => <PinTaskItem key={task.id} task={task} />)
                    ) : (
                        <p>No pin tasks</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PinTaskList;
