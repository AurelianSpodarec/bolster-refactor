import React from 'react';
import { connect } from 'react-redux';

import OperativeAlertsTable from '../presentational/OperativeAlertsTable';

const OperativeAlertsTableContainer = ({
    isFetching,
    error,
    operativeAlerts
}) => (
    <OperativeAlertsTable
        headers={['Site name', 'Owned by', 'Permissions', 'Action']}
        operativeAlerts={operativeAlerts}
        isFetching={isFetching}
        error={error}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        operativeAlertsReducer: { operativeAlerts, isFetching, error }
    }
}) => ({
    isFetching,
    error,
    operativeAlerts: Object.values(operativeAlerts)
});

export default connect(mapStateToProps)(OperativeAlertsTableContainer);
