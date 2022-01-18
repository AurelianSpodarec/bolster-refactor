import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import StatusIcon from '../../statusIcon/presentationl/StatusIcon';
import { useSelector } from 'react-redux';
import { INVOICE_GEN_URL } from 'config';
import { isEmpty } from 'helpers/generic';

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
                <StatusIcon classes="large" />
            </div>
            <BlockHeading title={title} />
            <p>{message}</p>
            {!isEmpty(createdInvoice) && (
                <a
                    style={{ float: 'left', marginTop: 10 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${INVOICE_GEN_URL}/${createdInvoice.guid}/invoice-${createdInvoice.id}`}
                    className="button blue"
                >
                    <i className="fa fa-download fa-fw" /> Download Invoice
                </a>
            )}
        </ModalOuterContainer>
    );
};

export default PaymentSuccessModal;
