import React from 'react';
import moment from 'moment';

import Table from 'components/shared/generic/tables/presentational/Table';
import DrawingInspectionLogsListItem from './DrawingInspectionLogsListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DrawingInspectionLogsTable = ({
    isFetching,
    error,
    pins,
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
            <div className="inspection-log-table">
                <Table
                    headers={['Pin ID', 'Status', 'Actions']}
                    isFetching={isFetching}
                    error={error}
                    noData={!pins.length}
                    noDataMessage="No inspection logs to display."
                    withActions
                >
                    {[...pins]
                        .sort((a, b) => moment(b.updated) - moment(a.updated))
                        .map(pin => (
                            <DrawingInspectionLogsListItem
                                key={pin.id}
                                pin={pin}
                            />
                        ))}
                </Table>
            </div>
        </div>
    </BlockContainer>
);

export default DrawingInspectionLogsTable;
