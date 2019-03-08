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
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Inspection Log</h2>
        <div className="area-filter">
            <i className="far fa-magnify" />
            <input
                type="text"
                name="filterValue"
                onChange={handleFilterChange}
            />
        </div>
        <Table
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!inspectionLogs.length}
            noDataMessage="There are no credit logs to display."
        >
            <DrawingInspectionLogsList inspectionLogs={inspectionLogs} />
        </Table>
    </div>
);

export default DrawingInspectionLogsTable;
