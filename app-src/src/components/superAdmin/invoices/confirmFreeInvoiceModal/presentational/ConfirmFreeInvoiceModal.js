import React from 'react';
// import { Link } from 'react-router-dom';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const ConfirmFreeInvoiceModal = ({ hideModal, handleSubmit }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Confirm Free Invoice" />
            <p className="generic-text intro-text size-lg-12">
                Are you sure you would like to make this invoice free? Doing so
                will make the value of the invoice and all its items £00.00.
            </p>

            <BlockButtonWrapper>
                <button className="button green" onClick={handleSubmit}>
                    <i className="far fa-check" />
                    Confirm
                </button>
                <button className="button red" onClick={hideModal}>
                    <i className="far fa-times" />
                    Cancel
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default ConfirmFreeInvoiceModal;
