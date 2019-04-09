import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';

class PaidInvoicesContainer extends Component {
    render = () => {
        const { error, isFetching, paidInvoices } = this.props;
        return (
            <BlockContainer heading="Paid Invoices">
                <InvoicesTableContainer
                    error={error}
                    isFetching={isFetching}
                    invoices={paidInvoices}
                />
            </BlockContainer>
        );
    };
}

const mapStateToProps = ({ companyAdmin: { invoicesReducer } }) => ({
    paidInvoices:
        Object.values(invoicesReducer.invoices).filter(
            invoice => invoice.isPaid
        ) || []
});

export default connect(mapStateToProps)(PaidInvoicesContainer);
