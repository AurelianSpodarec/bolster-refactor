import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchBugReport from './hooks/useFetchBugReport';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const BugReportSingle = () => {
    const { id } = useParams();

    const { bugReport, isFetching, error } = useFetchBugReport(id);
    console.log(bugReport);
    return (
        <>
            <PageHeading title="Bug Report" withBackButton></PageHeading>
            <BlockContainer></BlockContainer>
        </>
    );
};

export default BugReportSingle;
