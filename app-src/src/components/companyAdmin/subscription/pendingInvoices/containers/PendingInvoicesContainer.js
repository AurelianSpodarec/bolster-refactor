import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingInvoices from '../presentational/PendingInvoices';

class PendingInvoicesContainer extends Component {
    render = () => <PendingInvoices invoices={this.props.invoices} />;

    PendingInvoices = invoices => invoices.filter(({ isPaid }) => !isPaid);
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { invoices, error, isFetching }
    }
}) => ({
    invoices: Object.values(invoices).filter(invoice => !invoice.isPaid),
    error,
    isFetching
});

export default connect(mapStateToProps)(PendingInvoicesContainer);
