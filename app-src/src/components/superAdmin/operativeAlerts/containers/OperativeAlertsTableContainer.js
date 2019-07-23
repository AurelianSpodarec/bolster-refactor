import React from 'react';
import { connect } from 'react-redux';
import OperativeAlertsTable from '../presentational/OperativeAlertsTable';

const OperativeAlertsTableContainer = ({
    isFetching,
    error,
    operativeAlerts
}) => (
    <OperativeAlertsTable
        headers={['Message', 'Sent on', 'Sent', 'Delivered %', 'Read %', '']}
        operativeAlerts={operativeAlerts}
        isFetching={isFetching}
        error={error}
    />
);

const mapStateToProps = ({
    superAdmin: {
        operativeAlertsReducer: { operativeAlerts, isFetching, error }
    }
}) => ({ operativeAlerts: Object.values(operativeAlerts), isFetching, error });

export default connect(mapStateToProps)(OperativeAlertsTableContainer);
