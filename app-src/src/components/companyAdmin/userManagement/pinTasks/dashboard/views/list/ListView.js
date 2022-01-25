import React from 'react';
import useList from './hooks/useList';

import TasksLegend from '../../TasksLegend';
import ListTable from './ListTable';

const ListView = ({ startDate, startEditPinTask }) => {
    const { pinTasks, isFetching, error, statuses, types } = useList(startDate);

    return (
        <div className="list-view size-lg-12">
            <TasksLegend {...{ types, statuses, pinTasks }} />
            <ListTable {...{ startEditPinTask, types, statuses, pinTasks, isFetching, error }} />
        </div>
    );
};

export default ListView;
