import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import MergeToolFormContainer from '../containers/MergeToolFormContainer';

const MergeTool = () => (
    <>
        <PageHeading title="Merge tool" withBackButton/>
        <MergeToolFormContainer />
    </>
);

export default MergeTool;