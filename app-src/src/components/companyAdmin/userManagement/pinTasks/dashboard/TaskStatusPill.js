import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setPinStatusFilters from 'actions/companyAdmin/pinTasks/sync/setPinStatusFilters';
import { selectPinStatusFilters } from 'selectors/companyAdmin/pinTasks';

const TaskStatusPill = ({ name, title }) => {
    const dispatch = useDispatch();
    const selected = useSelector(selectPinStatusFilters);

    const isActive = selected.includes(name);

    return (
        <button
            className={`${isActive ? '' : 'no-background-btn'}`}
            onClick={() => {
                if (isActive) {
                    const updatedList = selected.filter(status => status !== name);
                    return dispatch(setPinStatusFilters(updatedList));
                }

                const updatedList = selected.concat(name);
                dispatch(setPinStatusFilters(updatedList));
            }}
        >
            <div className="task-pill" key={name}>
                <div className={`square ${name}`} />
                <div className="title">{title}</div>
            </div>
        </button>
    );
};

export default TaskStatusPill;
