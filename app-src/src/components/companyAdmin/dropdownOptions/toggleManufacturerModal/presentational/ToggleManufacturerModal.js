import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

// const ToggleManufacturerModal = ({ toggleManufacturer, hideModal, message }) => (
const ToggleManufacturerModal = ({ hideModal, message }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Confirmation'} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            {/* <button className="button green" onClick={toggleManufacturer}> */}
            <button className="button green" onClick={() => {}}>
                <i className={'far fa-check fa-fw'} />
                Confirm
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ToggleManufacturerModal;
