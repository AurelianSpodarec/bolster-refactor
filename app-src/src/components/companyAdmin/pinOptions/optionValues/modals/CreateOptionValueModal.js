import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateOptionValueModal = () => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Add ##Installation Type##'} />

            <p className="generic-text size-lg-12">
                Create an ##installation type## and apply prices to different measurements.
                <br />
                Your operatives will be able to apply a measurement to each ##installation## used on
                a history to calculate a price associated to that pin.
            </p>
        </ModalOuterContainer>
    );
};

export default CreateOptionValueModal;
