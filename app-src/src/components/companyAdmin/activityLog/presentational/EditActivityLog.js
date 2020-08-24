import React from 'react';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const EditActivityLog = ({ logs, isFetching, error }) => (
    <BlockContainer
        isFetching={isFetching}
        error={error}
        isEmpty={isEmpty(logs)}
        heading="Edit Activity Log Settings"
    ></BlockContainer>
);

export default EditActivityLog;
