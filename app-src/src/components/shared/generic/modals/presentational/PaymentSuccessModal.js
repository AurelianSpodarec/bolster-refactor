import React from 'react';
import { useSelector } from 'react-redux';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import { INVOICE_GEN_URL } from 'config';
import { isEmpty } from 'helpers/generic';
import LinkButton from '../../button/presentational/LinkButton';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const PaymentSuccessModal = ({
    title = 'Order Complete',
    message = 'Your order has been placed successfully.',
}) => {
    const createdInvoice = useSelector(
        state => state.companyAdmin.invoicesReducer.createdInvoiceDetails,
    );

    return (
        <ModalOuterContainer extraClasses="response-modal">
            <div
                className=" size-lg-12"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <i
                    className="fa fa-check"
                    style={{
                        borderRadius: '100%',
                        backgroundColor: 'green',
                        color: 'white',
                        fontSize: '3em',
                        padding: '0.5em',
                    }}
                />
            </div>
            <BlockHeading title={title} />
            <p>{message}</p>
            <br />
            {!isEmpty(createdInvoice) && (
                <ButtonWrapper>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${INVOICE_GEN_URL}/${createdInvoice.guid}/invoice-${createdInvoice.id}`}
                        className="button blue"
                    >
                        <i className="fa fa-download fa-fw" /> Download Invoice
                    </a>
                </ButtonWrapper>
            )}
        </ModalOuterContainer>
    );
};

export default PaymentSuccessModal;
