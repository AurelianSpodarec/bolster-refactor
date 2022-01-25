import React from 'react';
import useList from './hooks/useList';

import TasksLegend from '../../TasksLegend';
import ListTable from './ListTable';

const ListView = ({ startDate, startEditPinTask }) => {
    const { pinTasks, isFetching, error, statuses, types } = useList(startDate);

    return (
        <div className="list-view size-lg-12">
            <TasksLegend types={types} statuses={statuses} pinTasks={pinTasks} />
            <ListTable
                startEditPinTask={startEditPinTask}
                pinTasks={pinTasks}
                startDate={startDate}
                types={types}
                statuses={statuses}
                isFetching={isFetching}
                error={error}
            />
        </div>
    );
};

export default ListView;
