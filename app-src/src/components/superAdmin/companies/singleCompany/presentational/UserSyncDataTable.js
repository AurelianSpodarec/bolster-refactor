import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';

const UserSyncDataTable = ({ headers, syncData, isFetching }) => {
    return (
        <Table headers={headers} isFetching={isFetching} noData={!syncData.length}>
            {Object.values(syncData).map(syncData => {
                return (
                    <tr key={syncData.id}>
                        <td>{syncData.id}</td>
                        <td>{syncData.startDate}</td>
                        <td>{syncData.completionDate}</td>
                        <td>{syncData.hasErrored}</td>
                        <td>{syncData.deviceType}</td>
                        <td>{syncData.appVersion}</td>
                        <td>{syncData.pinsSynced}</td>
                        <td className="left-align">{syncData.pinHistoriesSynced}</td>
                    </tr>
                );
            })}
        </Table>
    );
};

export default UserSyncDataTable;
