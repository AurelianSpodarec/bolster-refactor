import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DrawingUploadLogList from './DrawingUploadLogList';

const DrawingUploadLogTable = ({ isFetching, fetchError, drawingsLogs }) => {
    console.log(drawingsLogs);
    return (
        <BlockContainer>
            <BlockHeading title="All Drawing Upload Log" classes="w-table"></BlockHeading>
            <Table
                withActions
                headers={[
                    'Company name',
                    "Drawing's status",
                    'Hierarchy',
                    'Uploaded on',
                    'Uploaded by',
                    'File format',
                    'Original file dimensions',
                    'Download',
                ]}
                isFetching={isFetching}
                error={fetchError}
                noData={!drawingsLogs.length}
                noDataMessage="No Drawing Upload Logs to display"
            >
                <DrawingUploadLogList drawingsLogs={drawingsLogs} />
            </Table>
        </BlockContainer>
    );
};

export default DrawingUploadLogTable;
