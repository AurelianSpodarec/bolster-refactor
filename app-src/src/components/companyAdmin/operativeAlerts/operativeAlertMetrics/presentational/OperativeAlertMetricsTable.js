import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const OperativeAlertMetricsTable = ({ alertMetrics, isFetching, error }) => (
    <Table headers={['Operative name', 'Delivered', 'Read']} isFetching={isFetching} error={error}>
        {alertMetrics.map(alert => (
            <tr key={alert.id}>
                <td>
                    {alert.firstName} {alert.lastName} - {alert.operativeCode} ({alert.email})
                </td>
                <td>
                    {!alert.deliveredOn ? (
                        'Not yet delivered'
                    ) : (
                        <DateTimeContainer date={alert.deliveredOn} />
                    )}
                </td>
                <td>
                    {!alert.readOn ? 'Not yet read' : <DateTimeContainer date={alert.readOn} />}
                </td>
                <td />
            </tr>
        ))}
    </Table>
);

export default OperativeAlertMetricsTable;
