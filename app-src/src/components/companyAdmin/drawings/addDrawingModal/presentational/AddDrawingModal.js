import React from 'react';

import AddDrawingFormContainer from '../containers/AddDrawingFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const AddDrawingModal = ({ floorID }) => (
    <>
        <ModalOuterContainer>
            <BlockHeading title={'Create Drawing'} />
            <AddDrawingFormContainer floorID={floorID} />
        </ModalOuterContainer>
    </>
);

export default AddDrawingModal;
