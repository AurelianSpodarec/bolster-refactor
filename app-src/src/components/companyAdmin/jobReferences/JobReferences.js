import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const JobReferences = () => {
    return (
        <>
            <PageHeading title="Job References" withBackButton />
            <BlockContainer>
                <BlockHeading title="Job References" />
                {/* <TemplatesTableContainer /> */}
            </BlockContainer>
            {/* <PinOptionsTableContainer /> */}
        </>
    );
};

export default JobReferences;
