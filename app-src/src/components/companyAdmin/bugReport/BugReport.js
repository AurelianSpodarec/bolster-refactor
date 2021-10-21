import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';

const BugReport = () => {
    return (
        <>
            <PageHeading title="Bug Report" withBackButton />

            <BlockContainer>
                <BlockHeading title="Bug Report Form" />
                <Form></Form>
            </BlockContainer>
        </>
    );
};

export default BugReport;
