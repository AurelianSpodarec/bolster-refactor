import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import AlertItem from './AlertItem';
import { isEmpty } from 'lodash';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

const UpcomingAlerts = ({ error, isFetching, alerts }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, []);
    const sortedAlerts = useMemo(() => {
        return Object.values(alerts).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [alerts]);

    return (
        <>
            <PageHeading title="Upcoming Alerts" />

            <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(alerts)}>
                <BlockHeading title="Alerts" />
                <Table
                    headers={[
                        'Date',
                        'Created On',
                        'Last sent on',
                        'Hierarchy Link',
                        'Method',
                        'Created by',
                        'Frequency',
                        'Name',
                        'Description',
                        '',
                    ]}
                    isFetching={isFetching}
                    error={error}
                    noData={isEmpty(alerts)}
                    noDataMessage="There are no alerts to display."
                >
                    {sortedAlerts.map(alert => (
                        <AlertItem key={alert.id} alert={alert} />
                    ))}
                </Table>
            </BlockContainer>
        </>
    );
};

export default UpcomingAlerts;
