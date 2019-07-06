import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateLabelInfoContainer from '../containers/TemplateLabelInfoContainer';
import LabelExampleContainer from '../containers/LabelExampleContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import { isEmpty } from 'helpers/generic';

const LabelExamplePage = ({ templates, isFetching, error }) => (
    <>
        <PageHeading title="Preview Label" leftChildren={true}>
            <BackButtonContainer />
        </PageHeading>
        <div className="size-lg-6">
            <TemplateLabelInfoContainer />
        </div>
        <div className="size-lg-6">
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(templates)}
            >
                <LabelExampleContainer />
            </BlockContainer>
        </div>
    </>
);

export default LabelExamplePage;
