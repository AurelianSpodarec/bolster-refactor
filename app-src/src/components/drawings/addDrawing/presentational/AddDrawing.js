import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddDrawingFormContainer from '../containers/AddDrawingFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const AddDrawing = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Add drawing' }]} />
        <Block>
            <AddDrawingFormContainer />
        </Block>
    </>
);

export default AddDrawing;
