import Table from 'components/shared/generic/tables/presentational/Table';
import React from 'react';
import ListTableRow from './ListTableRow';

const ListTable = () => {
    const headers = ['Operatives', 'Drawing', 'Pins', 'Due Date', 'Action Date', 'Tags'];

    const rows = [
        {
            type: 'non_recurring',
            status: 'complete',
            date: '2021-10-21T10:09:36.792Z',
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
                <ListTableRow key={i} {...row} />
            ))}
        </Table>
    );
};

export default ListTable;
