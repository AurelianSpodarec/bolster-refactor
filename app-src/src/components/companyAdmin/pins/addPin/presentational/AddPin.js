import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import AddPinContainer from '../containers/AddPinContainer';

const AddPin = () => (
    <>
        <PageHeading leftChildren={true} title="Add Pin">
            <BackButtonContainer />
        </PageHeading>
        <AddPinContainer />
    </>
);

export default AddPin;
