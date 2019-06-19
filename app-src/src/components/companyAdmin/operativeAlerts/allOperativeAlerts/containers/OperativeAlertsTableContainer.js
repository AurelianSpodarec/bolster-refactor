import React from 'react';
import { connect } from 'react-redux';

import OperativeAlertsTable from '../presentational/OperativeAlertsTable';

const OperativeAlertsTableContainer = ({
    isFetching,
    error,
    operativeAlerts
}) => (
    <OperativeAlertsTable
        headers={[
            'Created By',
            'Message',
            'Sent On',
            'Sent',
            'Delivered %',
            'Read %',
            ''
        ]}
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
