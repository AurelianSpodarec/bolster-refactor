import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ViewZonesModal = ({ hideModal }) => (
    <ModalOuterContainer>
        <BlockHeading title="View zones"></BlockHeading>

        <p>Zones to go here...</p>

        <BlockButtonWrapper>
            <button className="button green">
                Add Zone
            </button>
            <button className="button grey" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ViewZonesModal;
