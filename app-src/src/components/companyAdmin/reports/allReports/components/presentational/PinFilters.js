import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PinFiltersFormContainer from '../containers/PinFiltersFormContainer';

const PinFilters = () => (
    <>
        <BlockHeading title="Pin options" />
        <PinFiltersFormContainer />
    </>
);

export default PinFilters;
