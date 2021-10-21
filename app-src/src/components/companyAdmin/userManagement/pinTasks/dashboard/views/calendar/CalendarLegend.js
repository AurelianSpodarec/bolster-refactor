import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { PIN_TASK_RECURRING_NAMES, PIN_TASK_STATUS_NAMES } from 'constants/companyAdmin/enums';
import React from 'react';
import LegendSegment from './LegendSegment';

const CalendarLegend = () => {
    const types = [
        {
            name: 'recurring',
            title: PIN_TASK_RECURRING_NAMES.RECURRING,
            percent: 99,
        },
        {
            name: 'non_recurring',
            title: PIN_TASK_RECURRING_NAMES.NON_RECURRING,
            percent: 1,
        },
    ];

    const statuses = [
        {
            name: 'complete',
            title: PIN_TASK_STATUS_NAMES.COMPLETE,
            percent: 25,
        },
        {
            name: 'complete_late',
            title: PIN_TASK_STATUS_NAMES.COMPLETE_LATE,
            percent: 25,
        },
        {
            name: 'due_soon',
            title: PIN_TASK_STATUS_NAMES.DUE_SOON,
            percent: 20,
        },
        {
            name: 'incomplete',
            title: PIN_TASK_STATUS_NAMES.INCOMPLETE,
            percent: 30,
        },
    ];

    return (
        <BlockContainer contentClass="legend" containerClass="size-lg-8 pull-right">
            <LegendSegment stats={types} />
            <LegendSegment stats={statuses} />
        </BlockContainer>
    );
};

export default CalendarLegend;
