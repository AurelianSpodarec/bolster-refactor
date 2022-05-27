import React from 'react';

import { TABLE_SORT_DIRECTIONS } from 'constants/shared/tables';

import TableBody from './TableBody';

const { ASC, DESC } = TABLE_SORT_DIRECTIONS;

const Table = ({
    headers,
    error,
    isFetching,
    showLoaderWhenFetching,
    noData,
    noDataMessage = 'There is no data to display',
    withActions = false,
    children,
    extraClasses = '',
    withoutTBody,
    //colspan first th, sometimes have spacing issues
    //needs colspan on table item also, if true
    colSpanFirst = false,
    tableColumnWidths = [],
    hideHeaders = false,
    isSortable,
    sortDirection,
    sortName,
}) => {
    return (
        <table className={`generic-table ${withActions ? 'with-actions' : ''} ${extraClasses}`}>
            {!hideHeaders && (
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th
                                colSpan={colSpanFirst && i === 0 ? '2' : ''}
                                key={i}
                                style={{
                                    width: tableColumnWidths.length ? tableColumnWidths[i] : 'auto',
                                    cursor: isSortable && header.onClick ? 'pointer' : 'auto',
                                }}
                                onClick={isSortable ? header.onClick : null}
                            >
                                {isSortable ? (
                                    <span>
                                        {header.name}{' '}
                                        {header.onClick && (
                                            <i
                                                className={`sort-icon fa fa-${
                                                    sortName === header.name &&
                                                    sortDirection === ASC
                                                        ? 'sort-up'
                                                        : sortName === header.name &&
                                                          sortDirection === DESC
                                                        ? 'sort-down'
                                                        : 'sort'
                                                }`}
                                            ></i>
                                        )}
                                    </span>
                                ) : typeof header === 'string' ? (
                                    header
                                ) : (
                                    header()
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}

            <TableBody
                colCount={headers.length}
                error={error}
                isFetching={isFetching}
                noData={noData}
                noDataMessage={noDataMessage}
                withoutTBody={withoutTBody}
                showLoaderWhenFetching={showLoaderWhenFetching}
            >
                {children}
            </TableBody>
        </table>
    );
};

export default Table;
