import React from 'react';

import useDeleteJobReference from './hooks/useDeleteJobReference';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const DeleteJobReferenceModal = ({ hideModal, id }) => {
    const { isPosting, handleSubmit } = useDeleteJobReference(id);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Delete Job Reference" />

            <p className="generic-text intro-text size-lg-12">
                Are you sure you would like to delete this job reference?
            </p>

            <BlockButtonWrapper>
                <button
                    className={`button green ${isPosting ? 'disabled' : ''}`}
                    onClick={handleSubmit}
                >
                    <i className={`fa fa-fw ${isPosting ? 'fa-spinner fa-spin' : 'fa-save'}`} />
                    {isPosting ? 'Please wait...' : 'Confirm'}
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default DeleteJobReferenceModal;
