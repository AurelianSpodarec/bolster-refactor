import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingInvoices from '../presentational/PendingInvoices';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllInvoiceItems from 'actions/companyAdmin/invoices/async/fetchAllInvoiceItems';

class PendingInvoicesContainer extends Component {
    render = () => (
        <BlockContainer>
            <PendingInvoices />
        </BlockContainer>
    );

    componentDidMount = () => {
        const { fetchInvoiceData } = this.props;
        fetchInvoiceData();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchInvoiceData: () => {
        dispatch(fetchAllInvoices());
        dispatch(fetchAllInvoiceItems());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(PendingInvoicesContainer);
