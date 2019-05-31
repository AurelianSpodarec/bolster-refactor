import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class PaidInvoicesContainer extends Component {
    render = () => {
        const { error, isFetching, paidInvoices } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Payments" />
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
