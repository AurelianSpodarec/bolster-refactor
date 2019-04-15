import React from 'react';

import AddPinFormContainer from '../containers/AddPinFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const AddPin = () => (
    <>
        <PageHeading leftChildren={true} title="Add Pin">
            <BackButtonContainer />
        </PageHeading>
        <AddPinFormContainer />
    </>
);

export default AddPin;
