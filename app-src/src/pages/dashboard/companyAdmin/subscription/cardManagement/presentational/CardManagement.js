import React from 'react';

import CardTableContainer from '../containers/CardTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CardManagement = () => (
    <BlockContainer>
        <BlockHeading title="Cards" />
        <CardTableContainer />
    </BlockContainer>
);

export default CardManagement;
