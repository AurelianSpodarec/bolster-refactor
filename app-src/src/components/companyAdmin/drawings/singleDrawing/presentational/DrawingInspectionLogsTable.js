import React from 'react';
import moment from 'moment';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingInspectionLogsListItem from '../presentational/DrawingInspectionLogsListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DrawingInspectionLogsTable = ({
    isFetching,
    error,
    inspectionLogs,
    handleFilterChange
}) => (
    <BlockContainer containerClass="inspection-log flex-item size-lg-4">
        <div className="size-lg-12">
            <BlockHeading title="Inspection Log">
                <div className="area-filter">
                    <i className="icon far fa-search" />
                    <input
                        type="text"
                        name="filterValue"
                        placeholder="Enter Pin ID..."
                        onChange={handleFilterChange}
                    />
                </div>
            </BlockHeading>
            <Table
                headers={['Pin ID', 'Status', 'Actions']}
                isFetching={isFetching}
                error={error}
                noData={!inspectionLogs.length}
                noDataMessage="No inspection logs to display"
                withActions
            >
                {[...inspectionLogs]
                    .sort((a, b) => moment(b.updated) - moment(a.updated))
                    .slice(0, 2)
                    .map(inspectionLog => (
                        <DrawingInspectionLogsListItem
                            key={inspectionLog.id}
                            inspectionLog={inspectionLog}
                        />
                    ))}
            </Table>
        </div>
    </BlockContainer>
);

export default DrawingInspectionLogsTable;
