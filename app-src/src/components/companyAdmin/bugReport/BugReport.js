import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import BugReportForm from './BugReportForm';

const BugReport = () => {
    return (
        <>
            <PageHeading title="Bug Report" withBackButton />

            <BlockContainer>
                <BlockHeading title="Bug Report Form">
                    <p className="sub-title size-lg-12">
                        Please provide as much detail as possible about the issue you are
                        experiencing. <br />
                        We will not be able to raise a ticket with our development team until this
                        form has been completed.
                    </p>
                </BlockHeading>

                <BugReportForm />
            </BlockContainer>
        </>
    );
};

export default BugReport;
