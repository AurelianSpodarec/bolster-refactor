import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import List from './List';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import withDropZone from '../hocs/withDropZone';

const headers = ['Value 1', 'Value 2', 'Value 3', 'Value 4'];
const DropTable = () => {
    return (
        <BlockContainer>
            <BlockHeading title="Drag 'n' Drop" classes="w-table" />

            <Table withActions headers={headers}>
                <List colCount={headers.length} />
            </Table>
        </BlockContainer>
    );
};

export default withDropZone(DropTable);
