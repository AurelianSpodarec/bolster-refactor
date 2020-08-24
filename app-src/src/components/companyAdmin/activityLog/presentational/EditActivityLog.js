import React from 'react';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditActivityLogFormContainer from '../containers/EditActivityLogFormContainer';

const EditActivityLog = ({ settings, isFetching, error }) => (
    <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(settings)}>
        <BlockHeading title="Edit Activity Log Settings" />
        <EditActivityLogFormContainer settings={settings} />
    </BlockContainer>
);

export default EditActivityLog;
