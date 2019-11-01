import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmSubmitModal = ({
    handleSubmit,
    hideModal,
    message = 'Are you sure you want to submit this?',
    submitButtonText = 'Submit'
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Submit Confirmation" />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        <BlockButtonWrapper>
            <button className="button green" onClick={handleSubmit}>
                <i className="fa fa-save fa-fw" />
                {submitButtonText}
            </button>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmSubmitModal;
