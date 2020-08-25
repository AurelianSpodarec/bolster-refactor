import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EditActivityLogFormContainer from '../containers/EditActivityLogFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const EditActivityLog = ({ settings, isFetching, error }) => (
    <>
        <PageHeading title="Edit Activity Log Settings" withBackButton />
        <BlockContainer isFetching={isFetching} error={error} isEmpty={!isFetching}>
            <EditActivityLogFormContainer settings={settings} />
        </BlockContainer>
    </>
);

export default EditActivityLog;
