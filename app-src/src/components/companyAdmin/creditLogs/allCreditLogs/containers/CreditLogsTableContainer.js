import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreditLogsTable from '../presentational/CreditLogsTable';

class CreditLogsTableContainer extends Component {
    render() {
        const { creditLogs, isFetching, error } = this.props;
        const tableHeaders = ['Date', 'Type', 'Quantity', ''];

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

const mapStateToProps = ({ companyAdmin: { creditsReducer } }) => ({
    creditLogs: Object.values(creditsReducer.credits) || null,
    isFetching: creditsReducer.isFetching,
    error: creditsReducer.error
});

export default connect(mapStateToProps)(CreditLogsTableContainer);
