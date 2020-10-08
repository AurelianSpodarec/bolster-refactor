import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TrustedBy from '../presentational/TrustedBy';

const TrustedByContainer = () => {
    return (
        <>
            <PageHeading title="Trusted By" withBackButton />
            <Block>
                <BlockContainer>
                    <TrustedBy />
                </BlockContainer>
            </Block>
        </>
    );
};

export default TrustedByContainer;
