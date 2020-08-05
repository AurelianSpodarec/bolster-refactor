import React from 'react';

import TableBody from './TableBody';

const Table = ({
    headers,
    error,
    isFetching,
    noData,
    noDataMessage = 'There is no data to display',
    withActions = false,
    children,
    extraClasses = '',
    withoutTBody,
    //colspan first th, sometimes have spacing issues
    //needs colspan on table item also, if true
    colSpanFirst = false,
}) => {
    return (
        <table className={`generic-table ${withActions ? 'with-actions' : ''} ${extraClasses}`}>
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th colSpan={colSpanFirst && i === 0 ? '2' : ''} key={header + i}>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>

            <TableBody
                colCount={headers.length}
                error={error}
                isFetching={isFetching}
                noData={noData}
                noDataMessage={noDataMessage}
                withoutTBody={withoutTBody}
            >
                {children}
            </TableBody>
        </table>
    );
};

export default Table;
