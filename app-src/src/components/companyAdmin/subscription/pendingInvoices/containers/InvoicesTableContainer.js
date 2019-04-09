import React, { Component } from 'react';
import { connect } from 'react-redux';
import InvoicesTable from '../presentational/InvoicesTable';

class InvoicesTableContainer extends Component {
    render() {
        const { invoices, error, isFetching } = this.props;
        return (
            <InvoicesTable
                headers={[
                    'Date',
                    'Order ID',
                    'Total',
                    'Type',
                    'Status',
                    '',
                    'Action'
                ]}
                error={error}
                isFetching={isFetching}
                invoices={Object.values(invoices)}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        invoicesReducer: { error, isFetching }
    }
}) => ({
    error,
    isFetching
});

export default connect(mapStateToProps)(InvoicesTableContainer);
