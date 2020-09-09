import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

export default function NewFeaturesTable() {
    return (
        <>
            <BlockContainer>
                <BlockHeading title="Recent Updates" />
                <button className="button green">
                    <i className="fa fa-plus" /> Add New Feature
                </button>
                {/* <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!sosCodes.length}
                noDataMessage="No New Features to display"
            >
            </Table> */}
            </BlockContainer>
        </>
    );
}
