import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import deleteInvoice from 'actions/companyAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { usePrevious } from 'helpers/hooks';

const RequestDeleteInvoiceModal = ({ id }) => {
    const dispatch = useDispatch();
    const { postFailure, isPosting } = useSelector(state => state.companyAdmin.invoicesReducer);
    const prevPosting = usePrevious({ isPosting });

    const handleDelete = () => {
        dispatch(deleteInvoice(id));
    };

    useEffect(() => {
        if (prevPosting.isPosting && !isPosting && !postFailure) {
            dispatch(hideModal());
        }
    }, [isPosting, prevPosting.isPosting]);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Request Delete Invoice" />
            <>
                <p className="generic-text intro-text size-lg-12">
                    Are you sure you want to request email to delete this invoice?
                </p>
                {postFailure && (
                    <p className="generic-text intro-text size-lg-12 error">{postFailure}</p>
                )}
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
