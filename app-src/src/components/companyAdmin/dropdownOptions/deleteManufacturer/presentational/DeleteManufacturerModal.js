import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const DeleteManufacturerModal = ({ deleteManufacturer, hideModal, manufacturer }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Confirmation'} />
            <p className="generic-text intro-text size-lg-12">
                {`Are you sure you want to delete this manufacturer - ${manufacturer.name}?`}
            </p>
            <BlockButtonWrapper>
                <button className="button green" onClick={deleteManufacturer}>
                    <i className={'far fa-check fa-fw'} />
                    Confirm
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default DeleteManufacturerModal;
