import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import TrustedByContainer from '../containers/TrustedByContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const HomeSettings = () => (
    <>
        <PageHeading title="Home Setting" withBackButton />
        <Block>
            <BlockHeading title="Trusted By Logo's" />
            <BlockContainer>
                <TrustedByContainer />
            </BlockContainer>
        </Block>
    </>
);

export default HomeSettings;
