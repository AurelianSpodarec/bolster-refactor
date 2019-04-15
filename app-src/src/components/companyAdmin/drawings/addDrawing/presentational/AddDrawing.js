import React from 'react';

import AddDrawingFormContainer from '../containers/AddDrawingFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AddDrawing = () => (
    <>
        <PageHeading leftChildren={true} title={'Create Drawing'}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <AddDrawingFormContainer />
        </BlockContainer>
    </>
);

export default AddDrawing;
