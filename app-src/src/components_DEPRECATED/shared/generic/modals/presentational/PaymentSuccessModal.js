import React from 'react';
import { useSelector } from 'react-redux';

import { INVOICE_GEN_URL } from 'config';
import { isEmpty } from 'helpers/generic';
import LinkButton from '../../button/presentational/LinkButton';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import FlexModalOuter from './FlexModalOuter';
import ActionButton from '../../button/presentational/ActionButton';

const PaymentSuccessModal = ({
    title = 'Order Complete',
    message = 'Your order has been placed successfully.',
    handleClose,
}) => {
    const createdInvoice = useSelector(
        state => state.companyAdmin.invoicesReducer.createdInvoiceDetails,
    );

    return (
        <FlexModalOuter title={title} extraClasses="response-modal">
            <div className="flex-content-wrapper">
                <div className="flex-content">
                    <p className="generic-text">{message}</p>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Close"
                        source={isEmpty(createdInvoice) ? 'primary' : 'secondary'}
                        onClick={handleClose}
                    />
                    {!isEmpty(createdInvoice) && (
                        <LinkButton
                            text="Download Invoice"
                            icon="download"
                            href={`${INVOICE_GEN_URL}/${createdInvoice.guid}/invoice-${createdInvoice.id}`}
                            isExternalLink
                            openInNewTab
                            isDownloadable
                        />
                    )}
                </ButtonWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default PaymentSuccessModal;
