import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceDetails from '../presentational/InvoiceDetails';

class InvoiceDetailsContainer extends Component {
    render() {
        const { invoice, error, isFetching } = this.props;
        return (
            <InvoiceDetails
                invoice={invoice}
                isFetching={isFetching}
                error={error}
            />
        );
    }
}

const mapStateToProps = ({ companyAdmin: { invoicesReducer } }, ownProps) => {
    return {
        invoice: invoicesReducer.invoices[ownProps.match.params.id] || {},
        error: invoicesReducer.error,
        isFetching: invoicesReducer.isFetching
    };
};

export default withRouter(connect(mapStateToProps)(InvoiceDetailsContainer));
