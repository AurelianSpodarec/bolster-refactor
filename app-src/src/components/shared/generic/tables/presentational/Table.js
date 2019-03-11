import React from 'react';

import TableBody from './TableBody';

const Table = ({
    headers,
    error,
    isFetching,
    noData,
    noDataMessage = 'There is no data to display.',
    withActions = false,
    children
}) => {
    return (
        <table className={`generic-table ${withActions ? 'with-actions' : ''}`}>
            <tbody>
                <tr>
                    {headers.map((header, i) => (
                        <th key={header + i}>{header}</th>
                    ))}
                </tr>
                <TableBody
                    colCount={headers.length}
                    error={error}
                    isFetching={isFetching}
                    noData={noData}
                    noDataMessage={noDataMessage}
                >
                    {children}
                </TableBody>
            </tbody>
        </table>
    );
};

export default Table;
