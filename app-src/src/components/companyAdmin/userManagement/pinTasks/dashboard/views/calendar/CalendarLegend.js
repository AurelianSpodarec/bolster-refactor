import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';
import LegendSegment from './LegendSegment';

const CalendarLegend = () => {
    const types = [
        {
            name: 'recurring',
            title: 'Recurring',
            percent: 99,
        },
        {
            name: 'non-recurring',
            title: 'Non-Recurring',
            percent: 1,
        },
    ];

    const statuses = [
        {
            name: 'complete',
            title: 'Complete',
            percent: 25,
        },
        {
            name: 'complete-late',
            title: 'Complete (Late)',
            percent: 25,
        },
        {
            name: 'due-soon',
            title: 'Due Soon',
            percent: 20,
        },
        {
            name: 'incomplete',
            title: 'Incomplete',
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
