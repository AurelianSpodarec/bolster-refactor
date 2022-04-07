import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateOptionSet = ({ pinOptionTypeID }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Create Set" />

            <p>
                Create an 'set' for your sites.
                <br />
                <br />
                You will be able to set prices for your installation types and choose which options
                are available to your operatives through the app.
            </p>
        </ModalOuterContainer>
    );
};

export default CreateOptionSet;
