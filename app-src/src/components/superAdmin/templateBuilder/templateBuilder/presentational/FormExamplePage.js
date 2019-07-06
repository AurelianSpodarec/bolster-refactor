import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import TemplateLabelInfoContainer from '../containers/TemplateLabelInfoContainer';
import FormExampleContainer from '../containers/FormExampleContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const FormExample = () => (
    <>
        <PageHeading title="Preview Label" leftChildren={true}>
            <BackButtonContainer />
        </PageHeading>
        {/* <div className="size-lg-6">
            <TemplateLabelInfoContainer />
        </div> */}
        <div className="size-lg-12">
            <BlockContainer>
                <FormExampleContainer />
            </BlockContainer>
        </div>
    </>
);

export default FormExample;
