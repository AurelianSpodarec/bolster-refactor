import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingInvoices from '../presentational/PendingInvoices';

class PendingInvoicesContainer extends Component {
    render = () => <PendingInvoices invoices={this.props.invoices} />;
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { invoices }
    }
}) => ({
    invoices: Object.values(invoices).filter(invoice => !invoice.isPaid)
});

export default connect(mapStateToProps)(PendingInvoicesContainer);
