import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import deleteInvoice from 'actions/companyAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { usePrevious } from 'helpers/hooks';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const RequestDeleteInvoiceModal = ({ id }) => {
    const dispatch = useDispatch();
    const { postFailure, isPosting } = useSelector(state => state.companyAdmin.invoicesReducer);
    const [success, setSuccess] = useState();
    const prevPosting = usePrevious({ isPosting });

    const handleDelete = () => {
        dispatch(deleteInvoice(id));
    };

    useEffect(() => {
        if (prevPosting.isPosting && !isPosting && !postFailure) {
            setSuccess('Request has been sent.');
        }
    }, [isPosting, prevPosting.isPosting]);

    return (
        <FlexModalOuter title="Request Delete Invoice">
            <div className="flex-content-wrapper">
                <div className="flex-content">
                    <p className="generic-text size-lg-12">
                        Are you sure you want to request email to delete this invoice?
                    </p>
                    {postFailure && <p className="generic-text size-lg-12 error">{postFailure}</p>}
                    {success && <p className="generic-text size-lg-12 success">{success}</p>}
                </div>
            </div>

            {!success ? (
                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        onClick={() => dispatch(hideModal())}
                        source="secondary"
                        size="small"
                    />
                    <ActionButton onClick={handleDelete} text="Confirm" icon="check" />
                </ButtonWrapper>
            ) : (
                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        onClick={() => dispatch(hideModal())}
                        source="secondary"
                    />
                </ButtonWrapper>
            )}
        </FlexModalOuter>
    );
};

export default RequestDeleteInvoiceModal;
