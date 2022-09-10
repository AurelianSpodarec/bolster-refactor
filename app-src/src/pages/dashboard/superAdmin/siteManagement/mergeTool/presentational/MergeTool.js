import React from 'react';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import MergeToolFormContainer from '../containers/MergeToolFormContainer';

const MergeTool = () => (
    <>
        <PageHeading title="Merge tool" />
        <MergeToolFormContainer />
    </>
);

export default MergeTool;
