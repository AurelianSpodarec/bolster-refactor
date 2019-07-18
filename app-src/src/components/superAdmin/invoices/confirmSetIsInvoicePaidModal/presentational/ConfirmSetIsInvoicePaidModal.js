import React from 'react';
// import { Link } from 'react-router-dom';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ConfirmSetIsInvoicePaidModal = ({ hideModal, handleSubmit, isPaid }) => (
    <ModalOuterContainer>
        <BlockHeading title="Confirm Free Invoice" />
        <p className="generic-text intro-text size-lg-12">
            Are you sure you would like to mark this invoice as{' '}
            {isPaid ? 'unpaid' : 'paid'}?
        </p>
        <BlockButtonWrapper>
            <button className="button green" onClick={handleSubmit}>
                <i className="far fa-check" />
                Confirm
            </button>
            <button className="button red" type="button" onClick={hideModal}>
                <i className="far fa-times" />
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmSetIsInvoicePaidModal;
