import React from 'react';
import { useDispatch } from 'react-redux';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import deleteInvoice from 'actions/companyAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const RequestDeleteInvoiceModal = ({ id }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        deleteInvoice(id);
    };

    return (
        <ModalOuterContainer>
            <BlockHeading title="Request Delete Invoice" />
            <>
                <p className="generic-text intro-text size-lg-12">
                    Are you sure you want to request email to delete this invoice?
                </p>
                <BlockButtonWrapper>
                    <button className="button blue" onClick={handleDelete}>
                        <i className="far fa-envelope fa-fw" />
                        Request Delete
                    </button>
                    <button className="button" onClick={() => dispatch(hideModal())}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </>
        </ModalOuterContainer>
    );
};

export default RequestDeleteInvoiceModal;
