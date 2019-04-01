import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingInspectionLogsList from '../presentational/DrawingInspectionLogsList.js';

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
            <DrawingInspectionLogsList inspectionLogs={inspectionLogs} />
        </Table>
    </div>
);

export default DrawingInspectionLogsTable;
