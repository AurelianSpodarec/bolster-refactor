import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import useUpcomingAlerts from '../hooks/useUpcomingAlerts';
import AlertItem from './AlertItem';
import { isEmpty } from 'lodash';

const UpcomingAlerts = ({ error, isFetching, alerts }) => {
    const { fields, handleChange } = useUpcomingAlerts();

    return (
        <>
            <PageHeading title="Upcoming Alerts" withBackButton />

            <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(alerts)}>
                <BlockHeading title="Alerts" />
                <Table
                    headers={[
                        'Date',
                        'Created On',
                        'Last sent on',
                        'Hierarchy Link',
                        'Method',
                        'Creted by user/company',
                        'Frequency Amount',
                        'Message',
                    ]}
                    isFetching={isFetching}
                    error={error}
                    noData={isEmpty(alerts)}
                    noDataMessage="There are no alerts to display."
                >
                    {Object.values(alerts)
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(alert => (
                            <AlertItem key={alert.id} alert={alert} />
                        ))}
                </Table>
            </BlockContainer>
        </>
    );
};

export default UpcomingAlerts;
