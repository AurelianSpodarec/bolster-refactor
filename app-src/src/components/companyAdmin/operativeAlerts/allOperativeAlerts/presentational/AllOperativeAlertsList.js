import React from 'react';

import OperativeAlertItem from './OperativeAlertItem';

const AllOperativeAlertsList = ({ operativeAlerts }) =>
    operativeAlerts.map(alert => (
        <OperativeAlertItem key={alert.id} alert={alert} />
    ));

export default AllOperativeAlertsList;
