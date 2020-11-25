import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';

const UserSyncDataTable = ({ headers, syncData }) => {
    return (
        <Table headers={headers}>
            {syncData.map(syncData => {
                return (
                    <tr key={syncData.syncID}>
                        <td>{syncData.syncID}</td>
                        <td>{syncData.startDate}</td>
                        <td>{syncData.completionDate}</td>
                        <td>{syncData.errored}</td>
                        <td>{syncData.deviceType}</td>
                        <td>{syncData.appVersion}</td>
                        <td>{syncData.numOfPinsSynced}</td>
                        <td className="left-align">{syncData.numOfPinHistory}</td>
                    </tr>
                );
            })}
        </Table>
    );
};

export default UserSyncDataTable;
