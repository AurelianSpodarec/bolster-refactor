import Table from 'components/shared/generic/tables/presentational/Table';
import React from 'react';
import SeriesListRow from './SeriesTableRow';

const SeriesTable = () => {
    const headers = [
        'Operative',
        'Drawing',
        'Pins',
        'Series Start Date',
        'Series End Date',
        'Last Action Date',
    ];

    const rows = [
        {
            type: 'non_recurring',
            status: 'complete',
            date: '2021-10-21T10:09:36.792Z',
            endDate: '2021-11-21T00:00:00.002Z',
            recurring: 'none',
            days: [],
            operatives: [5738, 223],
            site: 821,
            building: 1288,
            floor: 2740,
            drawing: 3226,
            pins: [3233348, 3233350, 3233412],
        },
    ];

    return (
        <Table headers={headers}>
            {rows.map((row, i) => (
                <SeriesListRow key={i} {...row} />
            ))}
        </Table>
    );
};

export default SeriesTable;
