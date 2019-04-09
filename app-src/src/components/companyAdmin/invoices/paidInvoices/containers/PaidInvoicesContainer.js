import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllInvoiceItems from 'actions/companyAdmin/invoices/async/fetchAllInvoiceItems';

class PaidInvoicesContainer extends Component {
    render = () => (
        <BlockContainer>
            <div />
        </BlockContainer>
    );
}

const mapStateToProps = ()

export default connect(
    null,
)(PaidInvoicesContainer);
