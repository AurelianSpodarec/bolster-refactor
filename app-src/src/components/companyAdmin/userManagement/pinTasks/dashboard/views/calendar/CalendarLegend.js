import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { PIN_TASK_RECURRING_NAMES, PIN_TASK_STATUS_NAMES } from 'constants/companyAdmin/enums';
import React from 'react';
import LegendSegment from './LegendSegment';

const CalendarLegend = ({ types, statuses, pinTasks }) => {
    console.log('types', types, statuses);
    const numberOfTasks = Object.values(pinTasks).length;
    const titleEnum = {
        recurring: PIN_TASK_RECURRING_NAMES.RECURRING,
        non_recurring: PIN_TASK_RECURRING_NAMES.NON_RECURRING,
        complete: PIN_TASK_STATUS_NAMES.COMPLETE,
        complete_late: PIN_TASK_STATUS_NAMES.COMPLETE_LATE,
        due_soon: PIN_TASK_STATUS_NAMES.DUE_SOON,
        incomplete: PIN_TASK_STATUS_NAMES.INCOMPLETE,
    };

    const type = Object.keys(types).map(item => {
        return {
            name: item,
            title: titleEnum[item],
            percent: types[item] ? Math.round((types[item] / numberOfTasks) * 100) : 0,
        };
    });

    const status = Object.keys(statuses).map(item => {
        return {
            name: item,
            title: titleEnum[item],
            percent: statuses[item] ? Math.round((statuses[item] / numberOfTasks) * 100) : 0,
        };
    });

    return (
        <BlockContainer contentClass="legend" containerClass="size-lg-8 pull-right">
            <LegendSegment stats={type} />
            <LegendSegment stats={status} />
        </BlockContainer>
    );
};

export default CalendarLegend;
