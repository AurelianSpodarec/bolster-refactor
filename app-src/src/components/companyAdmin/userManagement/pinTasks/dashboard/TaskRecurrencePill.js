import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setPinRecurrenceFilters from 'actions/companyAdmin/pinTasks/sync/setPinRecurrenceFilters';
import { selectPinRecurrenceFilters } from 'selectors/companyAdmin/pinTasks';

const TaskRecurrencePill = ({ name, title }) => {
    const dispatch = useDispatch();
    const selected = useSelector(selectPinRecurrenceFilters);

    const isActive = selected === name;

    return (
        <button
            className="no-background-btn"
            onClick={() => dispatch(setPinRecurrenceFilters(isActive ? null : name))}
        >
            <div className={`task-pill${isActive ? '' : ' active'}`} key={name}>
                <div className={`square ${name}`} />
                <div className="title">{title}</div>
            </div>
        </button>
    );
};

export default TaskRecurrencePill;
