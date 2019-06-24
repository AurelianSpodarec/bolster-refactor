import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateLabelInfoContainer from '../containers/TemplateLabelInfoContainer';
import LabelExampleContainer from '../containers/LabelExampleContainer';

const LabelExamplePage = () => (
    <>
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
