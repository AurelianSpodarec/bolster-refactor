import React from 'react';
import { connect } from 'react-redux';

import PendingInvoices from '../presentational/PendingInvoices';

const PendingInvoicesContainer = ({ invoices }) => <PendingInvoices invoices={invoices} />;

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { invoices }
    }
}) => ({
    invoices: Object.values(invoices).filter(({ isPaid }) => !isPaid)
});

export default connect(mapStateToProps)(PendingInvoicesContainer);
