import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddPinFormContainer from '../containers/AddPinFormContainer';

const AddPin = () => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: 'Drawing', link: '/' }, { text: 'Add pin' }]}
        />

        <AddPinFormContainer />
    </>
);

export default AddPin;
