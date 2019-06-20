import React, { useState } from 'react';
import { connect } from 'react-redux';

import InvoicePayments from 'components/superAdmin/invoices/singleInvoice/presentational/InvoicePayments.js';

const InvoicePaymentsContainer = () => {
    const [paymentInput, changePaymentInput] = useState(0);
    return (
        <InvoicePayments
            paymentInput={paymentInput}
            handleChange={changePaymentInput}
        />
    );
};

const mapStateToProps = ({ superAdmin: { invoicesReducer } }) => ({
    invoicesReducer
});

export default connect(mapStateToProps)(InvoicePaymentsContainer);
