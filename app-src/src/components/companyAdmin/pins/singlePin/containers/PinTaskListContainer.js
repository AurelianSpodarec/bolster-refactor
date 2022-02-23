import React from 'react';
import { useSelector } from 'react-redux';

import PinTaskList from '../presentational/PinTaskList';
import {
    selectPinTasksIsFetching,
    selectSinglePinTasks,
    selectSinglePinTaskSeries,
} from '../../../../../selectors/companyAdmin/pinTasks';

const PinTaskListContainer = () => {
    const pinSeriesTasks = useSelector(selectSinglePinTaskSeries);
    const pinTasks = useSelector(selectSinglePinTasks);
    const isFetching = useSelector(selectPinTasksIsFetching);

    return (
        <PinTaskList
            pinSeries={Object.values(pinSeriesTasks)}
            pinTasks={Object.values(pinTasks)}
            isFetching={isFetching}
        />
    );
};

export default PinTaskListContainer;
