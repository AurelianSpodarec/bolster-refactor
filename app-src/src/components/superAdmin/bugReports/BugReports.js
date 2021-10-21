import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const BugReports = () => {
    return (
        <>
            <PageHeading title="Bug Reports" withBackButton></PageHeading>
            <BlockContainer></BlockContainer>
        </>
    );
};

export default BugReports;
