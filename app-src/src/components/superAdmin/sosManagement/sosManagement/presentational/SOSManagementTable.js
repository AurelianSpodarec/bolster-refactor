import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SOSCodeList from './SOSCodeList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SOSManagementTable = ({
    sosCodes,
    headers,
    isFetching,
    error,
    showSOSModal
}) => {
    return (
        <BlockContainer>
            <BlockHeading title="SOS Codes" classes="w-table">
                <button onClick={showSOSModal} className="button green">
                    <i className="fa fa-plus" /> New SOS
                </button>
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!sosCodes.length}
                noDataMessage="No sosCodes to display"
            >
                <SOSCodeList sosCodes={sosCodes} />
            </Table>
        </BlockContainer>
    );
};

export default SOSManagementTable;
