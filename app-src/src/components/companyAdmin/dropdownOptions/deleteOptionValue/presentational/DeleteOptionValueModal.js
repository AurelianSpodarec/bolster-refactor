import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const DeleteOptionValueModal = ({ handleDelete, hideModal, optionValue, deleteButtonText }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Confirmation'} />
            <p className="generic-text intro-text size-lg-12">
                {`Are you sure you want to delete this option value - ${optionValue.name}?`}
            </p>
            <BlockButtonWrapper>
                <button className="button green" onClick={handleDelete}>
                    <i className={'far fa-check fa-fw'} />
                    {deleteButtonText}
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default DeleteOptionValueModal;
