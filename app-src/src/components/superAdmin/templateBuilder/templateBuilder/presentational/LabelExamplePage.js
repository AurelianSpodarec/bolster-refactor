import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateLabelInfoContainer from '../containers/TemplateLabelInfoContainer';
import LabelExampleContainer from '../containers/LabelExampleContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const LabelExamplePage = () => (
    <>
        <PageHeading title="Preview Label" leftChildren={true}>
            <BackButtonContainer />
        </PageHeading>
        <div className="size-lg-6">
            <BlockContainer>
                <TemplateLabelInfoContainer />
            </BlockContainer>
        </div>
        <div className="size-lg-6">
            <BlockContainer>
                <LabelExampleContainer />
            </BlockContainer>
        </div>
    </>
);

export default LabelExamplePage;
