import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const OptionDocuments = () => {
    return (
        <>
            <PageHeading title={'##document name##'} withBackButton />

            <BlockContainer>
                <p>Documents here...</p>
            </BlockContainer>
        </>
    );
};

export default OptionDocuments;
