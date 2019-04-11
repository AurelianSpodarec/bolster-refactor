import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreditLogsTable from '../presentational/CreditLogsTable';

class CreditLogsTableContainer extends Component {
    render() {
        const { creditLogs, isFetching, error } = this.props;
        const tableHeaders = ['Date', 'Type', 'Quantity', 'Invoice no.', ''];

        return (
            <CreditLogsTable
                headers={tableHeaders}
                creditLogs={creditLogs}
                isFetching={isFetching}
                error={error}
            />
        );
    }
}

const mapStateToProps = ({ companyAdmin: { creditLogsReducer } }) => ({
    creditLogs: Object.values(creditLogsReducer.creditLogs) || null,
    isFetching: creditLogsReducer.isFetching,
    error: creditLogsReducer.error
});

export default connect(mapStateToProps)(CreditLogsTableContainer);
