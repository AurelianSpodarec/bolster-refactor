import React from 'react';

import AddFloorFormContainer from '../containers/AddFloorFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const AddFloor = () => (
    <>
        <PageHeading leftChildren={true} title={'Create Floor'}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <AddFloorFormContainer />
        </BlockContainer>
    </>
);

export default AddFloor;
