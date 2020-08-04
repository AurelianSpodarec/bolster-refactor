import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ZoneDetailsModal = ({
    zone,
    handleHideDetails
}) => (
        <ModalOuterContainer>
            <BlockHeading title={`Zone - ${zone.name}`}></BlockHeading>

            <BlockButtonWrapper>
                <button className="button grey" onClick={handleHideDetails}>
                    Back to zones
            </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );

export default ZoneDetailsModal;
