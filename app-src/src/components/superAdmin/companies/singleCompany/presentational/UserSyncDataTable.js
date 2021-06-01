import React from 'react';
import moment from 'moment';

import Table from 'components/shared/generic/tables/presentational/Table';

const UserSyncDataTable = ({ headers, syncData, isFetching, companyTimezone }) => {

    return (
        <Table headers={headers} isFetching={isFetching} noData={!syncData.length}>
            {Object.values(syncData)
                .sort((a, b) => moment(b.startDate) - moment(a.startDate))
                .map(syncData => {
                    return (
                        <tr key={syncData.id}>
                            <td>{syncData.id}</td>
                            <td>
                                {syncData.startDate
                                    ? moment(syncData.startDate)
                                          .tz(companyTimezone)
                                          .format('DD/MM/YYYY HH:mm')
                                    : '-'}
                            </td>
                            <td>
                                {syncData.completionDate
                                    ? moment(syncData.completionDate)
                                          .tz(companyTimezone)
                                          .format('DD/MM/YYYY HH:mm')
                                    : '-'}
                            </td>
                            <td>{syncData.hasErrored ? syncData.hasErrored : '-'}</td>
                            <td>{syncData.deviceType ? syncData.deviceType : '-'}</td>
                            <td>{syncData.appVersion ? syncData.appVersion : '-'}</td>
                            <td>{syncData.pinsSynced}</td>
                            <td className="left-align">{syncData.pinHistoriesSynced}</td>
                        </tr>
                    );
                })}
        </Table>
    );
};

export default UserSyncDataTable;
