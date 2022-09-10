import React from 'react';

import CardTableContainer from '../containers/CardTableContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';

const CardManagement = () => (
    <BlockContainer>
        <BlockHeading title="Cards" />
        <CardTableContainer />
    </BlockContainer>
);

export default CardManagement;
