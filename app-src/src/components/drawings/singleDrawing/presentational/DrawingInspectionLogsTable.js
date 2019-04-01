import React from 'react';
import moment from 'moment';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingInspectionLogsListItem from '../presentational/DrawingInspectionLogsListItem';

const DrawingInspectionLogsTable = ({
    headers,
    isFetching,
    error,
    inspectionLogs,
    handleFilterChange
}) => (
    <div className="inspection-log size-lg-4">
        <h2
            className="heading heading-3 size-lg-12"
            style={{ marginBottom: 0 }}
        >
            Inspection Log
        </h2>
        <div className="area-filter">
            <i className="icon far fa-search" />
            <input
                type="text"
                name="filterValue"
                placeholder="Enter Pin ID..."
                onChange={handleFilterChange}
            />
        </div>
        <Table
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!inspectionLogs.length}
            noDataMessage="There are no credit logs to display."
            withActions
        >
            {[...inspectionLogs]
                .sort((a, b) => moment(b.updated) - moment(a.updated))
                .slice(0, 2)
                .map(inspectionLog => (
                    <DrawingInspectionLogsListItem
                        inspectionLog={inspectionLog}
                    />
                ))}
        </Table>
    </div>
);

export default DrawingInspectionLogsTable;
