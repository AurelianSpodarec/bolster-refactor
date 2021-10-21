import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BugReportsTable from './BugReportsTable';

const BugReports = () => {
    return (
        <>
            <PageHeading title="Bug Reports" withBackButton></PageHeading>
            <BlockContainer>
                <BugReportsTable />
            </BlockContainer>
        </>
    );
};

export default BugReports;
